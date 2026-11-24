import { db } from '@/data/db';
import { islandRepository } from '@/data/repositories/islandRepository';
import { landmarkRepository } from '@/data/repositories/landmarkRepository';
import { stepRepository } from '@/data/repositories/stepRepository';
import { pillarChanges } from '@/game/islands/bridge';
import { allLandmarksReached, allStepsDone, bridgeTotal } from '@/game/islands/progress';
import type { Id, Island } from '@/game/model';

/** De tabellen die eilandhandelingen samen aanpassen (in één transactie). */
export const islandTables = () => [db.islands, db.landmarks, db.steps];

export interface IslandRefresh {
  /** true als het eiland door deze handeling net af is (tijd voor vuurwerk) */
  islandCompleted: boolean;
  /** Hoeveel pijlers van een brug er net bij kwamen */
  pillarsReached: number;
}

function isComplete(island: Island, landmarksDone: boolean, stepsDone: boolean, total: number) {
  if (island.type === 'bridge') return total >= (island.targetAmount ?? Infinity);
  if (island.parentIslandId !== null) return stepsDone;
  return landmarksDone;
}

/**
 * Kijkt na een wijziging opnieuw hoe het eiland ervoor staat: zijn er pijlers van een brug
 * bereikt, is het eiland af (of toch weer niet)? Bewaart ook dat je er net aan werkte.
 * Moet binnen een transactie op `islandTables()` aangeroepen worden.
 */
export async function refreshIsland(
  islandId: Id,
  now: number,
  { active = true }: { active?: boolean } = {},
): Promise<IslandRefresh> {
  const island = await islandRepository.get(islandId);
  if (!island) return { islandCompleted: false, pillarsReached: 0 };

  const landmarks = await landmarkRepository.listByIsland(islandId);
  const steps = await stepRepository.listByIsland(islandId);
  const total = bridgeTotal(steps);

  let pillarsReached = 0;
  if (island.type === 'bridge') {
    const changes = pillarChanges(landmarks, total, island.targetAmount ?? 0, now);
    pillarsReached = changes.filter((change) => change.completedAt !== null).length;
    await landmarkRepository.putMany(
      changes.flatMap(({ id, completedAt }) => {
        const landmark = landmarks.find((l) => l.id === id);
        return landmark ? [{ ...landmark, completedAt, updatedAt: now }] : [];
      }),
    );
  }

  const complete = isComplete(island, allLandmarksReached(landmarks), allStepsDone(steps), total);
  const status = complete ? 'completed' : 'active';
  await islandRepository.put({
    ...island,
    status: island.status === 'drifted' ? 'drifted' : status,
    lastActivityAt: active ? now : island.lastActivityAt,
    updatedAt: now,
  });

  return { islandCompleted: complete && island.status !== 'completed', pillarsReached };
}

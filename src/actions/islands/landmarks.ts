import { db } from '@/data/db';
import { markDeleted, newRecordFields } from '@/data/records';
import { landmarkRepository } from '@/data/repositories/landmarkRepository';
import { stepRepository } from '@/data/repositories/stepRepository';
import { cleanStepTitle } from '@/game/islands/islandInput';
import type { Id, Landmark } from '@/game/model';
import { moveInOrder, nextOrder } from '@/game/ordering';
import { type IslandRefresh, islandTables, refreshIsland } from './islandStatus';

async function requireLandmark(id: Id): Promise<Landmark> {
  const landmark = await landmarkRepository.get(id);
  if (!landmark) throw new Error(`Bezienswaardigheid ${id} niet gevonden`);
  return landmark;
}

/** Voegt een bezienswaardigheid toe achteraan het pad. */
export async function addLandmark(
  islandId: Id,
  title: string,
  now: number = Date.now(),
): Promise<Landmark | null> {
  const clean = cleanStepTitle(title);
  if (!clean) return null;
  return db.transaction('rw', islandTables(), async () => {
    const landmarks = await landmarkRepository.listByIsland(islandId);
    const landmark: Landmark = {
      ...newRecordFields(now),
      islandId,
      title: clean,
      order: nextOrder(landmarks),
      threshold: null,
      completedAt: null,
    };
    await landmarkRepository.put(landmark);
    // Een nieuw doel betekent dat een afgewerkt eiland weer open gaat
    await refreshIsland(islandId, now, { active: false });
    return landmark;
  });
}

export async function renameLandmark(id: Id, title: string, now = Date.now()): Promise<void> {
  const clean = cleanStepTitle(title);
  if (!clean) return;
  const landmark = await requireLandmark(id);
  await landmarkRepository.put({ ...landmark, title: clean, updatedAt: now });
}

/** Verwijdert een bezienswaardigheid, samen met de stappen ernaartoe. */
export async function deleteLandmark(id: Id, now: number = Date.now()): Promise<void> {
  await db.transaction('rw', islandTables(), async () => {
    const landmark = await requireLandmark(id);
    const steps = (await stepRepository.listByIsland(landmark.islandId)).filter(
      (step) => step.landmarkId === id,
    );
    await stepRepository.putMany(steps.map((step) => markDeleted(step, now)));
    await landmarkRepository.put(markDeleted(landmark, now));
    await refreshIsland(landmark.islandId, now, { active: false });
  });
}

export async function moveLandmark(id: Id, direction: -1 | 1, now = Date.now()): Promise<void> {
  await db.transaction('rw', islandTables(), async () => {
    const landmark = await requireLandmark(id);
    const siblings = await landmarkRepository.listByIsland(landmark.islandId);
    const changes = moveInOrder(siblings, id, direction);
    await landmarkRepository.putMany(
      changes.flatMap(({ id: changedId, order }) => {
        const sibling = siblings.find((s) => s.id === changedId);
        return sibling ? [{ ...sibling, order, updatedAt: now }] : [];
      }),
    );
  });
}

/** "Land in zicht!" – je bereikte een bezienswaardigheid. */
export async function reachLandmark(id: Id, now: number = Date.now()): Promise<IslandRefresh> {
  return db.transaction('rw', islandTables(), async () => {
    const landmark = await requireLandmark(id);
    await landmarkRepository.put({ ...landmark, completedAt: now, updatedAt: now });
    return refreshIsland(landmark.islandId, now);
  });
}

/** Toch nog niet bereikt? Zet de bezienswaardigheid weer open. */
export async function reopenLandmark(id: Id, now: number = Date.now()): Promise<void> {
  await db.transaction('rw', islandTables(), async () => {
    const landmark = await requireLandmark(id);
    await landmarkRepository.put({ ...landmark, completedAt: null, updatedAt: now });
    await refreshIsland(landmark.islandId, now, { active: false });
  });
}

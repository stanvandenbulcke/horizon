import { useLiveQuery } from 'dexie-react-hooks';
import { islandRepository } from '@/data/repositories/islandRepository';
import { landmarkRepository } from '@/data/repositories/landmarkRepository';
import { stepRepository } from '@/data/repositories/stepRepository';
import { islandProgress } from '@/game/islands/progress';
import type { Id, Island, Landmark, Step } from '@/game/model';

export interface IslandWithProgress {
  island: Island;
  /** Van 0 (net begonnen) tot 1 (af) */
  progress: number;
  /** Hoeveel bezienswaardigheden (of pijlers) al bereikt zijn: zo groot is het wezentje */
  reachedLandmarks: number;
}

function reachedCount(landmarks: readonly Landmark[]): number {
  return landmarks.filter((landmark) => landmark.completedAt !== null).length;
}

export interface IslandDetail extends IslandWithProgress {
  landmarks: Landmark[];
  steps: Step[];
  sideQuests: IslandWithProgress[];
}

function byIsland<T extends { islandId: Id }>(items: readonly T[], islandId: Id): T[] {
  return items.filter((item) => item.islandId === islandId);
}

/** Alle eilanden met hun voortgang (voor de kaart). `undefined` zolang ze laden. */
export function useIslandsWithProgress(): IslandWithProgress[] | undefined {
  return useLiveQuery(async () => {
    const [islands, landmarks, steps] = await Promise.all([
      islandRepository.list(),
      landmarkRepository.listAll(),
      stepRepository.listAll(),
    ]);
    return islands.map((island) => {
      const own = byIsland(landmarks, island.id);
      return {
        island,
        progress: islandProgress(island, own, byIsland(steps, island.id)),
        reachedLandmarks: reachedCount(own),
      };
    });
  }, []);
}

/**
 * Eén eiland met alles erop en eraan: bezienswaardigheden, stappen en side quests.
 * `undefined` zolang het laadt, `null` als het niet (meer) bestaat.
 */
export function useIslandDetail(id: Id | undefined): IslandDetail | null | undefined {
  return useLiveQuery(async () => {
    const island = id ? await islandRepository.get(id) : undefined;
    if (!island) return null;
    const [landmarks, steps, allIslands, allSteps] = await Promise.all([
      landmarkRepository.listByIsland(island.id),
      stepRepository.listByIsland(island.id),
      islandRepository.list(),
      stepRepository.listAll(),
    ]);
    const sideQuests = allIslands
      .filter((other) => other.parentIslandId === island.id)
      .map((quest) => ({
        island: quest,
        progress: islandProgress(quest, [], byIsland(allSteps, quest.id)),
        reachedLandmarks: 0,
      }));
    return {
      island,
      landmarks,
      steps,
      sideQuests,
      progress: islandProgress(island, landmarks, steps),
      reachedLandmarks: reachedCount(landmarks),
    };
  }, [id]);
}

import type { Id, Landmark, Timestamp } from '@/game/model';

export interface PillarChange {
  id: Id;
  completedAt: Timestamp | null;
}

/**
 * Welke pijlers van een brug moeten (niet meer) bereikt zijn, nu het totaal veranderde?
 * Geeft alleen de pijlers terug die moeten veranderen. Een pijler die je al bereikte,
 * houdt zijn datum.
 */
export function pillarChanges(
  landmarks: readonly Landmark[],
  total: number,
  target: number,
  now: Timestamp,
): PillarChange[] {
  return landmarks.flatMap((landmark): PillarChange[] => {
    if (landmark.threshold === null || landmark.deletedAt !== null) return [];
    const reached = target > 0 && total >= landmark.threshold * target;
    if (reached && landmark.completedAt === null) return [{ id: landmark.id, completedAt: now }];
    if (!reached && landmark.completedAt !== null) return [{ id: landmark.id, completedAt: null }];
    return [];
  });
}

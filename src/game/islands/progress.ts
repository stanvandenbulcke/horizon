import { config } from '@/game/config';
import type { Id, Island, Landmark, Step } from '@/game/model';
import { sortByOrder } from '@/game/ordering';

function isLive<T extends { deletedAt: number | null }>(item: T): boolean {
  return item.deletedAt === null;
}

/** De bezienswaardigheden van een eiland, in volgorde (zonder verwijderde). */
export function liveLandmarks(landmarks: readonly Landmark[]): Landmark[] {
  return sortByOrder(landmarks.filter(isLive));
}

/** De stappen bij een bezienswaardigheid (of, bij een side quest, met `null`), in volgorde. */
export function stepsFor(steps: readonly Step[], landmarkId: Id | null): Step[] {
  return sortByOrder(steps.filter((step) => isLive(step) && step.landmarkId === landmarkId));
}

/** De eerstvolgende bezienswaardigheid die je nog niet bereikte. Daar plan je stappen voor. */
export function currentLandmark(landmarks: readonly Landmark[]): Landmark | null {
  return liveLandmarks(landmarks).find((landmark) => landmark.completedAt === null) ?? null;
}

/** Hoeveel je al bij elkaar bracht voor een brug (alleen gedane stappen). */
export function bridgeTotal(steps: readonly Step[]): number {
  return steps
    .filter((step) => isLive(step) && step.doneAt !== null)
    .reduce((sum, step) => sum + (step.amount ?? 0), 0);
}

function doneFraction(steps: readonly Step[]): number {
  if (steps.length === 0) return 0;
  return steps.filter((step) => step.doneAt !== null).length / steps.length;
}

/**
 * Hoe ver ben je met dit eiland? Van 0 (net begonnen) tot 1 (af).
 * Hiermee trekt de mist op: met elke stap een beetje.
 */
export function islandProgress(
  island: Island,
  landmarks: readonly Landmark[],
  steps: readonly Step[],
): number {
  if (island.status === 'completed') return 1;

  if (island.type === 'bridge') {
    const target = island.targetAmount ?? 0;
    return target > 0 ? Math.min(1, bridgeTotal(steps) / target) : 0;
  }

  const pathLandmarks = liveLandmarks(landmarks);
  if (pathLandmarks.length === 0) {
    // Een side quest: gewoon de gedane stappen tellen
    return doneFraction(stepsFor(steps, null));
  }

  const reached = pathLandmarks.filter((landmark) => landmark.completedAt !== null).length;
  const current = currentLandmark(pathLandmarks);
  const partial = current
    ? doneFraction(stepsFor(steps, current.id)) * config.islands.stepCredit
    : 0;
  return Math.min(1, (reached + partial) / pathLandmarks.length);
}

/** Zijn alle bezienswaardigheden van een pad bereikt? */
export function allLandmarksReached(landmarks: readonly Landmark[]): boolean {
  const live = liveLandmarks(landmarks);
  return live.length > 0 && live.every((landmark) => landmark.completedAt !== null);
}

/** Zijn alle stappen van een side quest gedaan? */
export function allStepsDone(steps: readonly Step[]): boolean {
  const live = stepsFor(steps, null);
  return live.length > 0 && live.every((step) => step.doneAt !== null);
}

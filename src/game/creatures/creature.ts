import { config } from '@/game/config';
import type { Id } from '@/game/model';
import { pickBySeed } from '@/lib/random';

/** De soorten wezentjes. Elk eiland krijgt er vast één, gekozen op basis van zijn id. */
export const creatureSpecies = ['blob', 'bunny', 'dragon', 'kitten'] as const;
export type CreatureSpecies = (typeof creatureSpecies)[number];

/** Welk wezentje woont op dit eiland? Altijd hetzelfde voor hetzelfde eiland. */
export function speciesFor(islandId: Id): CreatureSpecies {
  return pickBySeed(creatureSpecies, islandId);
}

/**
 * Hoe groot is het wezentje? Stadium 1 = net uit het ei. Bij elke bereikte bezienswaardigheid
 * (of pijler) groeit het één stadium, tot het maximum.
 */
export function creatureStage(reachedLandmarks: number): number {
  return Math.min(config.creatures.maxStage, 1 + Math.max(0, reachedLandmarks));
}

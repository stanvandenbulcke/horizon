import type { IslandInput } from '@/game/islands/islandInput';
import type { Island, Landmark, Step } from '@/game/model';

/*
 * Kleine hulpjes om in tests snel een eiland, bezienswaardigheid of stap te maken.
 * Alleen voor tests: de app zelf gebruikt dit niet.
 */

const record = { createdAt: 0, updatedAt: 0, deletedAt: null };

/** Wat je invult voor een pad-eiland met 3 bezienswaardigheden. */
export const pathInput: IslandInput = {
  name: 'Rijbewijs',
  type: 'path',
  emoji: '🚗',
  color: '#ff8fa3',
  landmarkTitles: ['Theorie', 'Lessen', 'Examen'],
  targetAmount: null,
  unit: '',
};

/** Wat je invult voor een brug-eiland: 500 euro sparen. */
export const bridgeInput: IslandInput = {
  ...pathInput,
  name: 'Sparen',
  type: 'bridge',
  landmarkTitles: [],
  targetAmount: 500,
  unit: 'euro',
};

export function buildIsland(overrides: Partial<Island> = {}): Island {
  return {
    ...record,
    id: 'island',
    name: 'Eiland',
    type: 'path',
    emoji: '🏝️',
    color: '#ff8fa3',
    status: 'active',
    parentIslandId: null,
    position: { x: 0, z: 0 },
    lastActivityAt: 0,
    targetAmount: null,
    unit: null,
    ...overrides,
  };
}

export function buildLandmark(
  id: string,
  order: number,
  overrides: Partial<Landmark> = {},
): Landmark {
  return {
    ...record,
    id,
    islandId: 'island',
    title: id,
    order,
    threshold: null,
    completedAt: null,
    ...overrides,
  };
}

export function buildStep(id: string, overrides: Partial<Step> = {}): Step {
  return {
    ...record,
    id,
    islandId: 'island',
    landmarkId: null,
    title: id,
    amount: null,
    order: 0,
    doneAt: null,
    ...overrides,
  };
}

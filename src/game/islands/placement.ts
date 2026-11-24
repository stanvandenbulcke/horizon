import { config } from '@/game/config';
import type { MapPosition } from '@/game/model';

/** De "gulden hoek": zo komen eilanden mooi verspreid te liggen, zoals pitten in een zonnebloem. */
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
/**
 * Het eerste eiland ligt recht boven je thuiseiland op het scherm (de camera kijkt schuin
 * vanuit de hoek), want op een rechtopstaande iPhone is daar de meeste plaats.
 */
const START_ANGLE = (-3 * Math.PI) / 4;

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

export function distance(a: MapPosition, b: MapPosition): number {
  return Math.hypot(a.x - b.x, a.z - b.z);
}

/** De plek van het zoveelste eiland op de spiraal rond je thuiseiland. */
export function spiralPosition(index: number): MapPosition {
  const { firstRing, spacing } = config.map;
  const radius = firstRing + spacing * Math.sqrt(index);
  const angle = START_ANGLE + index * GOLDEN_ANGLE;
  return { x: round(Math.cos(angle) * radius), z: round(Math.sin(angle) * radius) };
}

/** De eerste vrije plek op de spiraal (een plek van een verwijderd eiland komt weer vrij). */
export function nextIslandPosition(taken: readonly MapPosition[]): MapPosition {
  for (let index = 0; ; index++) {
    const candidate = spiralPosition(index);
    if (taken.every((position) => distance(position, candidate) >= config.map.minDistance)) {
      return candidate;
    }
  }
}

/** Een plekje vlak naast het hoofdeiland voor een side quest, weg van andere side quests. */
export function sideQuestPosition(
  parent: MapPosition,
  siblings: readonly MapPosition[],
): MapPosition {
  const { sideQuestDistance } = config.map;
  // Schuin naar buiten (weg van je thuiseiland), om beurten links en rechts. Niet recht
  // erachter, anders vallen de naambordjes op het scherm over elkaar.
  const outward = Math.atan2(parent.z, parent.x);
  const offsets = [1, -1, 2, -2, 0, 3, -3, 4];
  const step = Math.PI / 4;
  const candidates = offsets.map((offset) => {
    const angle = outward + offset * step;
    return {
      x: round(parent.x + Math.cos(angle) * sideQuestDistance),
      z: round(parent.z + Math.sin(angle) * sideQuestDistance),
    };
  });
  const free = candidates.find((candidate) =>
    siblings.every((sibling) => distance(sibling, candidate) >= sideQuestDistance * 0.7),
  );
  return free ?? (candidates[0] as MapPosition);
}

/** Hoe ver ligt het verste eiland van het midden? (zodat de camera weet tot waar je mag schuiven) */
export function mapRadius(positions: readonly MapPosition[]): number {
  return positions.reduce((max, position) => Math.max(max, Math.hypot(position.x, position.z)), 0);
}

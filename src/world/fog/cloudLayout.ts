import { seededRandom } from '@/lib/random';

/** Eén wolkje van de mist. */
export interface Puff {
  x: number;
  y: number;
  z: number;
  scale: number;
  /** Waar in de dobberbeweging het wolkje begint, zodat ze niet allemaal tegelijk bewegen */
  phase: number;
}

/**
 * Een hoopje wolkjes boven een eiland. Voor hetzelfde zaadje altijd dezelfde wolkjes,
 * zodat de mist niet verspringt telkens je de kaart opent.
 */
export function clusterPuffs(seed: string, radius: number, count: number): Puff[] {
  const random = seededRandom(seed);
  return Array.from({ length: count }, () => {
    // sqrt zorgt voor een gelijkmatige spreiding over de hele cirkel
    const r = Math.sqrt(random()) * radius;
    const angle = random() * Math.PI * 2;
    return {
      x: Math.cos(angle) * r,
      y: 1 + random() * 1.1,
      z: Math.sin(angle) * r,
      scale: (0.75 + random() * 0.55) * (radius / 2.3),
      phase: random() * Math.PI * 2,
    };
  });
}

/** Een ring van grote wolken rond de bekende wereld: daarachter is alles nog onontdekt. */
export function ringPuffs(seed: string, innerRadius: number, count: number): Puff[] {
  const random = seededRandom(seed);
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + (random() - 0.5) * 0.15;
    const r = innerRadius + random() * 7;
    return {
      x: Math.cos(angle) * r,
      y: 0.6 + random() * 1.2,
      z: Math.sin(angle) * r,
      scale: 2.2 + random() * 1.6,
      phase: random() * Math.PI * 2,
    };
  });
}

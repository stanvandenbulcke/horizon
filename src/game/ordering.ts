import type { Id } from '@/game/model';

/** Alles wat je in een zelfgekozen volgorde kan zetten (routines, bezienswaardigheden, stappen). */
interface Ordered {
  id: Id;
  order: number;
}

export function sortByOrder<T extends Ordered>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order);
}

/** Het volgnummer voor iets nieuws: onderaan de lijst. */
export function nextOrder(items: readonly Ordered[]): number {
  return items.reduce((max, item) => Math.max(max, item.order + 1), 0);
}

/**
 * Schuift iets één plek omhoog (-1) of omlaag (+1).
 * Geeft terug welke items een nieuw volgnummer krijgen.
 */
export function moveInOrder(
  items: readonly Ordered[],
  id: Id,
  direction: -1 | 1,
): Array<{ id: Id; order: number }> {
  const sorted = sortByOrder(items);
  const index = sorted.findIndex((item) => item.id === id);
  const target = index + direction;
  const moving = sorted[index];
  const other = sorted[target];
  if (index === -1 || !moving || !other) {
    return [];
  }
  sorted[index] = other;
  sorted[target] = moving;
  return sorted.flatMap((item, order) => (item.order === order ? [] : [{ id: item.id, order }]));
}

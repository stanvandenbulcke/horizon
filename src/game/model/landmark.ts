import type { Id, SyncFields, Timestamp } from './common';

/**
 * Een bezienswaardigheid op een eiland: een tussendoel.
 * Bij een pad kies je ze zelf; bij een brug zijn het de pijlers op 25, 50, 75 en 100%.
 */
export interface Landmark extends SyncFields {
  islandId: Id;
  title: string;
  order: number;
  /** Alleen bij een brug: bij welk deel van het doel deze pijler staat (0.25 = 25%) */
  threshold: number | null;
  /** Wanneer je hem bereikte (null = nog niet) */
  completedAt: Timestamp | null;
}

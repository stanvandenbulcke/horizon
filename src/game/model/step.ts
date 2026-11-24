import type { Id, SyncFields, Timestamp } from './common';

/**
 * Een stap op weg naar een bezienswaardigheid (bij een pad), een hoeveelheid die planken
 * legt (bij een brug), of een stap van een side quest (dan is `landmarkId` leeg).
 */
export interface Step extends SyncFields {
  islandId: Id;
  landmarkId: Id | null;
  title: string;
  /** Alleen bij een brug: hoeveel deze stap oplevert (bv. 50 euro) */
  amount: number | null;
  order: number;
  /** Wanneer je hem deed (null = nog te doen) */
  doneAt: Timestamp | null;
}

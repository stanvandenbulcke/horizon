import type { Id, SyncFields, Timestamp } from './common';

/** pad = stappen in een volgorde naar de vuurtoren; brug = een doel met een getal (bv. €500). */
export type IslandType = 'path' | 'bridge';

/** "Slapend" staat hier niet bij: dat rekenen we uit met `lastActivityAt`. */
export type IslandStatus = 'active' | 'completed' | 'drifted';

/** Een plek op de kaart. De kaart ligt plat: x = links/rechts, z = boven/onder. */
export interface MapPosition {
  x: number;
  z: number;
}

/** Een eiland: één groot doel (of een side quest, als het een hoofdeiland heeft). */
export interface Island extends SyncFields {
  name: string;
  type: IslandType;
  emoji: string;
  /** Kleur van de vlag en de vuurtoren, als hex (bv. '#ff8fa3') */
  color: string;
  status: IslandStatus;
  /** Ingevuld bij een side quest: het grote eiland waar het naast ligt. */
  parentIslandId: Id | null;
  position: MapPosition;
  lastActivityAt: Timestamp;
  /** Alleen bij een brug: het doelgetal en de eenheid (bv. 500 en "euro"). */
  targetAmount: number | null;
  unit: string | null;
}

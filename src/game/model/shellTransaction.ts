import type { GameDay, Id, SyncFields } from './common';

/** Waarom kwamen er schelpen bij (of gingen er af)? */
export type ShellReason = 'routine';

/**
 * Eén regel in het schelpenkasboek. Je saldo is de som van alle regels.
 * Ongedaan maken = de regel als verwijderd markeren.
 */
export interface ShellTransaction extends SyncFields {
  day: GameDay;
  /** + bij verdienen, − bij uitgeven */
  amount: number;
  reason: ShellReason;
  /** Waar de schelpen bij horen, bv. de id van de routine. */
  refId: Id | null;
}

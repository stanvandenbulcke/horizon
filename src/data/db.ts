import Dexie, { type EntityTable } from 'dexie';
import type { DayLog, Island, Profile, Routine, ShellTransaction } from '@/game/model';

/**
 * De database van Horizon (IndexedDB via Dexie). Alles blijft op je toestel.
 *
 * Verandert er later iets aan de tabellen? Dan komt er een nieuwe `db.version(2)` bij.
 * Een bestaande versie pas je nooit aan, anders raakt de data op je iPhone in de war.
 */
export type HorizonDatabase = Dexie & {
  profile: EntityTable<Profile, 'id'>;
  routines: EntityTable<Routine, 'id'>;
  dayLogs: EntityTable<DayLog, 'id'>;
  shellTransactions: EntityTable<ShellTransaction, 'id'>;
  islands: EntityTable<Island, 'id'>;
};

export const db = new Dexie('horizon') as HorizonDatabase;

// Alleen de velden waarop we zoeken staan hier; alle andere velden worden gewoon mee bewaard.
db.version(1).stores({
  profile: 'id',
  routines: 'id, order',
  dayLogs: 'id',
  shellTransactions: 'id, day',
});

// Versie 2 (M2): eilanden. Tabellen die niet veranderen, hoeven hier niet opnieuw te staan.
db.version(2).stores({
  islands: 'id, parentIslandId',
});

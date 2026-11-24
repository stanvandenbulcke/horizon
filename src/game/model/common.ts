/** Unieke id van een rij (een UUID, zoals "3f2a…"). */
export type Id = string;

/** Een speldag als tekst: 'YYYY-MM-DD'. Een speldag loopt van 04:00 tot 04:00. */
export type GameDay = string;

/** Tijdstip in milliseconden sinds 1970 (zoals `Date.now()`). */
export type Timestamp = number;

/** Dag van de week: 1 = maandag … 7 = zondag. */
export type IsoWeekday = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const ALL_WEEKDAYS: readonly IsoWeekday[] = [1, 2, 3, 4, 5, 6, 7];

/**
 * Velden die elke opgeslagen rij heeft. Zo kan synchroniseren met Supabase later
 * zonder alles om te bouwen: verwijderen = `deletedAt` invullen, niet echt wissen.
 */
export interface SyncFields {
  id: Id;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;
}

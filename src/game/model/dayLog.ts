import type { GameDay, Id, SyncFields } from './common';

/**
 * Het dagboekje van één speldag.
 * De id is de dag zelf ('YYYY-MM-DD'): er is er precies één per dag, ook als je later op
 * meerdere toestellen speelt.
 */
export interface DayLog extends SyncFields {
  day: GameDay;
  completedRoutineIds: Id[];
  /** Het dagdoel van die dag. Pas je je dagdoel later aan, dan blijven oude dagen kloppen. */
  dailyGoal: number;
}

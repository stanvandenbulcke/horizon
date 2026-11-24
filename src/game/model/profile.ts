import type { SyncFields } from './common';

/** Er is maar één speler, dus het profiel heeft altijd deze id. */
export const PROFILE_ID = 'me';

/** Jij: je instellingen en je reisgezel. Alles wat je kan uitrekenen (level, streak) staat hier niet. */
export interface Profile extends SyncFields {
  companionName: string;
  dailyGoal: number;
  soundOn: boolean;
}

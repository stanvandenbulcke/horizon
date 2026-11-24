import { config } from '@/game/config';
import type { GameDay, IsoWeekday, Routine } from '@/game/model';
import { sortByOrder } from '@/game/ordering';
import { weekdayOf } from '@/game/time/gameDay';

/** Wat je invult als je een routine maakt of aanpast. */
export interface RoutineInput {
  name: string;
  emoji: string;
  shells: number;
  weekdays: readonly IsoWeekday[];
}

export type RoutineInputError = 'nameRequired' | 'noWeekdays';

export type RoutineValidation =
  { ok: true; value: RoutineInput } | { ok: false; error: RoutineInputError };

/** Controleert en verbetert wat je invulde (spaties weg, schelpen tussen 1 en 3, …). */
export function validateRoutineInput(input: RoutineInput): RoutineValidation {
  const { minShells, maxShells, maxNameLength, fallbackEmoji } = config.routine;
  const name = input.name.trim().slice(0, maxNameLength);
  if (name === '') {
    return { ok: false, error: 'nameRequired' };
  }
  const weekdays = [...new Set(input.weekdays)].sort((a, b) => a - b);
  if (weekdays.length === 0) {
    return { ok: false, error: 'noWeekdays' };
  }
  return {
    ok: true,
    value: {
      name,
      emoji: input.emoji.trim() || fallbackEmoji,
      shells: Math.min(maxShells, Math.max(minShells, Math.round(input.shells))),
      weekdays,
    },
  };
}

/** Staat deze routine vandaag op het programma? */
export function isScheduledOn(routine: Routine, day: GameDay): boolean {
  return routine.active && routine.deletedAt === null && routine.weekdays.includes(weekdayOf(day));
}

/** De routines van één dag, in de volgorde die je zelf koos. */
export function routinesForDay(routines: readonly Routine[], day: GameDay): Routine[] {
  return sortByOrder(routines.filter((routine) => isScheduledOn(routine, day)));
}

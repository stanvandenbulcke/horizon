import { config } from '@/game/config';
import type { GameDay, Id, IsoWeekday, Routine } from '@/game/model';
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

export function sortByOrder(routines: readonly Routine[]): Routine[] {
  return [...routines].sort((a, b) => a.order - b.order);
}

/** De routines van één dag, in de volgorde die je zelf koos. */
export function routinesForDay(routines: readonly Routine[], day: GameDay): Routine[] {
  return sortByOrder(routines.filter((routine) => isScheduledOn(routine, day)));
}

/** Het volgnummer voor een nieuwe routine: onderaan de lijst. */
export function nextOrder(routines: readonly Routine[]): number {
  return routines.reduce((max, routine) => Math.max(max, routine.order + 1), 0);
}

/**
 * Schuift een routine één plek omhoog (-1) of omlaag (+1).
 * Geeft terug welke routines een nieuw volgnummer krijgen.
 */
export function moveInOrder(
  routines: readonly Routine[],
  id: Id,
  direction: -1 | 1,
): Array<{ id: Id; order: number }> {
  const sorted = sortByOrder(routines);
  const index = sorted.findIndex((routine) => routine.id === id);
  const target = index + direction;
  const moving = sorted[index];
  const other = sorted[target];
  if (index === -1 || !moving || !other) {
    return [];
  }
  sorted[index] = other;
  sorted[target] = moving;
  return sorted
    .map((routine, order) => ({ id: routine.id, order, changed: routine.order !== order }))
    .filter((entry) => entry.changed)
    .map(({ id: changedId, order }) => ({ id: changedId, order }));
}

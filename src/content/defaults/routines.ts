import type { RoutineInput } from '@/game/routines/routine';

export type DefaultRoutine = Omit<RoutineInput, 'weekdays'>;

/** De standaardlijst waaruit je kan kiezen. Je kan ze daarna nog aanpassen. */
export const defaultRoutines: readonly DefaultRoutine[] = [
  { emoji: '🏋️', name: 'Sporten of gym', shells: 3 },
  { emoji: '👟', name: '10.000 stappen', shells: 2 },
  { emoji: '📚', name: 'Les gevolgd', shells: 2 },
  { emoji: '📝', name: '45 min studeren', shells: 2 },
  { emoji: '📵', name: '1 uur schermvrij voor het slapen', shells: 2 },
  { emoji: '📖', name: '15 min lezen', shells: 1 },
  { emoji: '🗣️', name: '10 min een taal oefenen', shells: 1 },
  { emoji: '💧', name: '2 liter water', shells: 1 },
  { emoji: '😴', name: 'Op tijd in bed', shells: 1 },
  { emoji: '🧹', name: 'Kamer opgeruimd', shells: 1 },
  { emoji: '💬', name: 'Contact met een vriend of familie', shells: 1 },
  { emoji: '🧘', name: '5 min ademhalen of mediteren', shells: 1 },
];

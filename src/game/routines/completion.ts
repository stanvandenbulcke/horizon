import type { Id } from '@/game/model';

/** Zet een routine aan of af in de lijst van afgevinkte routines. */
export function withCompletion(completedIds: readonly Id[], routineId: Id, done: boolean): Id[] {
  const without = completedIds.filter((id) => id !== routineId);
  return done ? [...without, routineId] : without;
}

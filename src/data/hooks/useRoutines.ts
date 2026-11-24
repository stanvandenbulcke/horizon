import { useLiveQuery } from 'dexie-react-hooks';
import { routineRepository } from '@/data/repositories/routineRepository';
import type { Id, Routine } from '@/game/model';

/** Alle routines, in volgorde. `undefined` zolang ze nog laden. */
export function useRoutines(): Routine[] | undefined {
  return useLiveQuery(() => routineRepository.list(), []);
}

/** Eén routine. `undefined` zolang ze laadt, `null` als ze niet (meer) bestaat. */
export function useRoutine(id: Id | undefined): Routine | null | undefined {
  return useLiveQuery(async () => (id ? ((await routineRepository.get(id)) ?? null) : null), [id]);
}

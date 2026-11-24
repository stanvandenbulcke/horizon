import { db } from '@/data/db';
import { markDeleted, newRecordFields } from '@/data/records';
import { routineRepository } from '@/data/repositories/routineRepository';
import type { Id, Routine } from '@/game/model';
import {
  moveInOrder,
  nextOrder,
  type RoutineInput,
  type RoutineInputError,
  validateRoutineInput,
} from '@/game/routines/routine';

export type SaveRoutineResult =
  { ok: true; routine: Routine } | { ok: false; error: RoutineInputError };

/** Maakt een nieuwe routine, onderaan de lijst. */
export async function createRoutine(
  input: RoutineInput,
  now: number = Date.now(),
): Promise<SaveRoutineResult> {
  const validation = validateRoutineInput(input);
  if (!validation.ok) {
    return validation;
  }
  return db.transaction('rw', db.routines, async () => {
    const routine: Routine = {
      ...newRecordFields(now),
      ...validation.value,
      weekdays: [...validation.value.weekdays],
      active: true,
      order: nextOrder(await routineRepository.list()),
    };
    await routineRepository.put(routine);
    return { ok: true, routine };
  });
}

/** Past een bestaande routine aan. Al verdiende schelpen blijven gewoon staan. */
export async function updateRoutine(
  id: Id,
  input: RoutineInput,
  now: number = Date.now(),
): Promise<SaveRoutineResult> {
  const validation = validateRoutineInput(input);
  if (!validation.ok) {
    return validation;
  }
  const existing = await requireRoutine(id);
  const routine: Routine = {
    ...existing,
    ...validation.value,
    weekdays: [...validation.value.weekdays],
    updatedAt: now,
  };
  await routineRepository.put(routine);
  return { ok: true, routine };
}

/** Pauzeert een routine (ze verschijnt niet meer bij "Vandaag") of zet ze weer aan. */
export async function setRoutineActive(
  id: Id,
  active: boolean,
  now: number = Date.now(),
): Promise<void> {
  const existing = await requireRoutine(id);
  await routineRepository.put({ ...existing, active, updatedAt: now });
}

/** Verwijdert een routine. Schelpen die je ermee verdiende, hou je. */
export async function deleteRoutine(id: Id, now: number = Date.now()): Promise<void> {
  const existing = await requireRoutine(id);
  await routineRepository.put(markDeleted(existing, now));
}

/** Schuift een routine één plek omhoog (-1) of omlaag (+1) in de lijst. */
export async function moveRoutine(
  id: Id,
  direction: -1 | 1,
  now: number = Date.now(),
): Promise<void> {
  await db.transaction('rw', db.routines, async () => {
    const routines = await routineRepository.list();
    const changes = moveInOrder(routines, id, direction);
    const updated = changes.flatMap(({ id: changedId, order }) => {
      const routine = routines.find((r) => r.id === changedId);
      return routine ? [{ ...routine, order, updatedAt: now }] : [];
    });
    await routineRepository.putMany(updated);
  });
}

async function requireRoutine(id: Id): Promise<Routine> {
  const routine = await routineRepository.get(id);
  if (!routine) {
    throw new Error(`Routine ${id} niet gevonden`);
  }
  return routine;
}

import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '@/data/db';
import { routineRepository } from '@/data/repositories/routineRepository';
import { ALL_WEEKDAYS } from '@/game/model';
import {
  createRoutine,
  deleteRoutine,
  moveRoutine,
  setRoutineActive,
  updateRoutine,
} from './manageRoutines';

const input = { name: 'Lezen', emoji: '📖', shells: 1, weekdays: ALL_WEEKDAYS };

async function create(name: string) {
  const result = await createRoutine({ ...input, name });
  if (!result.ok) throw new Error(result.error);
  return result.routine;
}

beforeEach(async () => {
  await Promise.all(db.tables.map((table) => table.clear()));
});

describe('routines beheren', () => {
  it('zet nieuwe routines onderaan de lijst', async () => {
    await create('A');
    await create('B');
    expect((await routineRepository.list()).map((r) => r.name)).toEqual(['A', 'B']);
  });

  it('geeft een fout terug bij een lege naam, zonder iets op te slaan', async () => {
    expect(await createRoutine({ ...input, name: '' })).toEqual({
      ok: false,
      error: 'nameRequired',
    });
    expect(await routineRepository.list()).toEqual([]);
  });

  it('past een routine aan', async () => {
    const routine = await create('Lezen');
    await updateRoutine(routine.id, { ...input, name: '20 min lezen', shells: 2 });
    const updated = await routineRepository.get(routine.id);
    expect(updated?.name).toBe('20 min lezen');
    expect(updated?.shells).toBe(2);
  });

  it('pauzeert en activeert een routine', async () => {
    const routine = await create('Lezen');
    await setRoutineActive(routine.id, false);
    expect((await routineRepository.get(routine.id))?.active).toBe(false);
  });

  it('verwijdert een routine uit de lijst, maar bewaart ze voor later synchroniseren', async () => {
    const routine = await create('Lezen');
    await deleteRoutine(routine.id);
    expect(await routineRepository.list()).toEqual([]);
    expect((await db.routines.get(routine.id))?.deletedAt).not.toBeNull();
  });

  it('verandert de volgorde', async () => {
    await create('A');
    const b = await create('B');
    await moveRoutine(b.id, -1);
    expect((await routineRepository.list()).map((r) => r.name)).toEqual(['B', 'A']);
  });
});

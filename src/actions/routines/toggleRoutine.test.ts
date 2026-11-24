import { beforeEach, describe, expect, it } from 'vitest';
import { ensureProfile, setDailyGoal } from '@/actions/profile/profile';
import { db } from '@/data/db';
import { dayLogRepository } from '@/data/repositories/dayLogRepository';
import { shellRepository } from '@/data/repositories/shellRepository';
import { ALL_WEEKDAYS } from '@/game/model';
import { shellBalance, shellsEarnedOn } from '@/game/shells/shells';
import { createRoutine } from './manageRoutines';
import { toggleRoutine } from './toggleRoutine';

const TODAY = '2026-11-24';

async function makeRoutine(shells: number) {
  const result = await createRoutine({
    name: `Routine ${shells}`,
    emoji: '⭐',
    shells,
    weekdays: ALL_WEEKDAYS,
  });
  if (!result.ok) throw new Error(result.error);
  return result.routine;
}

beforeEach(async () => {
  await Promise.all(db.tables.map((table) => table.clear()));
  await ensureProfile();
});

describe('toggleRoutine', () => {
  it('geeft schelpen bij afvinken', async () => {
    const gym = await makeRoutine(3);
    const result = await toggleRoutine(gym.id, TODAY);

    expect(result).toEqual({ completed: true, shells: 3, goalReached: false });
    expect(shellBalance(await shellRepository.listAll())).toBe(3);
    expect((await dayLogRepository.get(TODAY))?.completedRoutineIds).toEqual([gym.id]);
  });

  it('neemt de schelpen terug als je het vinkje weghaalt', async () => {
    const gym = await makeRoutine(3);
    await toggleRoutine(gym.id, TODAY);
    const result = await toggleRoutine(gym.id, TODAY);

    expect(result.completed).toBe(false);
    expect(result.shells).toBe(-3);
    expect(shellBalance(await shellRepository.listAll())).toBe(0);
    expect((await dayLogRepository.get(TODAY))?.completedRoutineIds).toEqual([]);
  });

  it('meldt het één keer wanneer het dagdoel net gehaald wordt', async () => {
    const gym = await makeRoutine(3);
    const steps = await makeRoutine(2);
    const water = await makeRoutine(1);

    expect((await toggleRoutine(gym.id, TODAY)).goalReached).toBe(false);
    expect((await toggleRoutine(steps.id, TODAY)).goalReached).toBe(true);
    expect((await toggleRoutine(water.id, TODAY)).goalReached).toBe(false);
  });

  it('bewaart het dagdoel van die dag, ook als je het later verandert', async () => {
    const gym = await makeRoutine(3);
    await toggleRoutine(gym.id, '2026-11-23');
    await setDailyGoal(10, TODAY);

    expect((await dayLogRepository.get('2026-11-23'))?.dailyGoal).toBe(5);
  });

  it('houdt elke dag apart bij', async () => {
    const gym = await makeRoutine(3);
    await toggleRoutine(gym.id, '2026-11-23');
    await toggleRoutine(gym.id, TODAY);

    const all = await shellRepository.listAll();
    expect(shellsEarnedOn(all, '2026-11-23')).toBe(3);
    expect(shellsEarnedOn(all, TODAY)).toBe(3);
    expect(shellBalance(all)).toBe(6);
  });
});

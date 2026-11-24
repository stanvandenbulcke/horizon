import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '@/data/db';
import { dayLogRepository } from '@/data/repositories/dayLogRepository';
import { profileRepository } from '@/data/repositories/profileRepository';
import { ensureProfile, renameCompanion, setDailyGoal } from './profile';

beforeEach(async () => {
  await Promise.all(db.tables.map((table) => table.clear()));
});

describe('ensureProfile', () => {
  it('maakt bij de eerste start een profiel met standaardwaarden', async () => {
    const profile = await ensureProfile(1000);
    expect(profile.companionName).toBe('Kapoen');
    expect(profile.dailyGoal).toBe(5);
  });

  it('laat een bestaand profiel ongemoeid', async () => {
    await ensureProfile(1000);
    await renameCompanion('Bolleke', 2000);
    const profile = await ensureProfile(3000);
    expect(profile.companionName).toBe('Bolleke');
  });
});

describe('setDailyGoal', () => {
  it('past het dagdoel aan, ook voor vandaag', async () => {
    await ensureProfile();
    await dayLogRepository.put({
      id: '2026-11-24',
      day: '2026-11-24',
      createdAt: 0,
      updatedAt: 0,
      deletedAt: null,
      completedRoutineIds: [],
      dailyGoal: 5,
    });
    await setDailyGoal(8, '2026-11-24');
    expect((await profileRepository.get())?.dailyGoal).toBe(8);
    expect((await dayLogRepository.get('2026-11-24'))?.dailyGoal).toBe(8);
  });

  it('houdt het dagdoel binnen de grenzen', async () => {
    await ensureProfile();
    expect(await setDailyGoal(99, '2026-11-24')).toBe(20);
  });
});

describe('renameCompanion', () => {
  it('negeert een lege naam', async () => {
    await ensureProfile();
    expect(await renameCompanion('   ')).toBe(false);
    expect((await profileRepository.get())?.companionName).toBe('Kapoen');
  });
});

import { defaultCompanionName } from '@/content/defaults/profile';
import { db } from '@/data/db';
import { dayLogRepository } from '@/data/repositories/dayLogRepository';
import { profileRepository } from '@/data/repositories/profileRepository';
import { config } from '@/game/config';
import { type GameDay, PROFILE_ID, type Profile } from '@/game/model';
import { clampDailyGoal } from '@/game/shells/shells';

/** Maakt je profiel aan bij de allereerste start. Bestaat het al, dan verandert er niets. */
export async function ensureProfile(now: number = Date.now()): Promise<Profile> {
  return db.transaction('rw', db.profile, async () => {
    const existing = await profileRepository.get();
    if (existing) {
      return existing;
    }
    const profile: Profile = {
      id: PROFILE_ID,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      companionName: defaultCompanionName,
      dailyGoal: config.dailyGoal.default,
      soundOn: true,
    };
    await profileRepository.put(profile);
    return profile;
  });
}

async function requireProfile(): Promise<Profile> {
  const profile = await profileRepository.get();
  if (!profile) {
    throw new Error('Er is nog geen profiel');
  }
  return profile;
}

/**
 * Past je dagdoel aan. Het geldt meteen, ook voor vandaag.
 * Oude dagen houden hun eigen dagdoel, zodat je geschiedenis klopt.
 */
export async function setDailyGoal(
  goal: number,
  today: GameDay,
  now: number = Date.now(),
): Promise<number> {
  const dailyGoal = clampDailyGoal(goal);
  await db.transaction('rw', [db.profile, db.dayLogs], async () => {
    const profile = await requireProfile();
    await profileRepository.put({ ...profile, dailyGoal, updatedAt: now });
    const todayLog = await dayLogRepository.get(today);
    if (todayLog) {
      await dayLogRepository.put({ ...todayLog, dailyGoal, updatedAt: now });
    }
  });
  return dailyGoal;
}

/** Zet het geluid aan of uit. */
export async function setSoundOn(soundOn: boolean, now: number = Date.now()): Promise<void> {
  const profile = await requireProfile();
  await profileRepository.put({ ...profile, soundOn, updatedAt: now });
}

/** Geeft je reisgezel een nieuwe naam. Een lege naam wordt genegeerd. */
export async function renameCompanion(name: string, now: number = Date.now()): Promise<boolean> {
  const trimmed = name.trim().slice(0, config.companion.maxNameLength);
  if (trimmed === '') {
    return false;
  }
  const profile = await requireProfile();
  await profileRepository.put({ ...profile, companionName: trimmed, updatedAt: now });
  return true;
}

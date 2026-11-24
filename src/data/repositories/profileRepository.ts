import { db } from '@/data/db';
import { PROFILE_ID, type Profile } from '@/game/model';

export const profileRepository = {
  get(): Promise<Profile | undefined> {
    return db.profile.get(PROFILE_ID);
  },

  async put(profile: Profile): Promise<void> {
    await db.profile.put(profile);
  },
};

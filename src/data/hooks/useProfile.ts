import { useLiveQuery } from 'dexie-react-hooks';
import { profileRepository } from '@/data/repositories/profileRepository';
import type { Profile } from '@/game/model';

/** Je profiel. `undefined` zolang het nog laadt. Het scherm ververst vanzelf bij een wijziging. */
export function useProfile(): Profile | undefined {
  return useLiveQuery(() => profileRepository.get(), []);
}

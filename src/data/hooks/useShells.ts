import { useLiveQuery } from 'dexie-react-hooks';
import { shellRepository } from '@/data/repositories/shellRepository';
import type { GameDay } from '@/game/model';
import { shellBalance, shellsEarnedOn } from '@/game/shells/shells';

/** Je schelpensaldo. `undefined` zolang het laadt. */
export function useShellBalance(): number | undefined {
  return useLiveQuery(async () => shellBalance(await shellRepository.listAll()), []);
}

/** Hoeveel schelpen je op deze dag verdiende. `undefined` zolang het laadt. */
export function useShellsEarnedOn(day: GameDay): number | undefined {
  return useLiveQuery(async () => shellsEarnedOn(await shellRepository.listByDay(day), day), [day]);
}

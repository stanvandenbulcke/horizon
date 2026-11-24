import { useLiveQuery } from 'dexie-react-hooks';
import { dayLogRepository } from '@/data/repositories/dayLogRepository';
import type { DayLog, GameDay } from '@/game/model';

/** Het dagboekje van een dag. `undefined` zolang het laadt, `null` als er nog niets gebeurde. */
export function useDayLog(day: GameDay): DayLog | null | undefined {
  return useLiveQuery(async () => (await dayLogRepository.get(day)) ?? null, [day]);
}

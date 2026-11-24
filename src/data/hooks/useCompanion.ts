import { useLiveQuery } from 'dexie-react-hooks';
import { dayLogRepository } from '@/data/repositories/dayLogRepository';
import { shellRepository } from '@/data/repositories/shellRepository';
import {
  companionLevel,
  companionLook,
  growthPoints,
  pointsToNextLevel,
} from '@/game/companion/growth';

export interface CompanionStatus {
  /** 1 groeipunt per dag waarop je je dagdoel haalde (= ook het aantal plantjes in de tuin) */
  points: number;
  level: number;
  /** 0 = startlook, 1/2/3 = nieuwe looks vanaf level 3, 6 en 10 */
  look: number;
  toNextLevel: number;
}

/** Hoe staat je reisgezel ervoor? Uitgerekend uit je dagboekjes. `undefined` zolang het laadt. */
export function useCompanion(): CompanionStatus | undefined {
  return useLiveQuery(async () => {
    const [dayLogs, transactions] = await Promise.all([
      dayLogRepository.listAll(),
      shellRepository.listAll(),
    ]);
    const points = growthPoints(dayLogs, transactions);
    const level = companionLevel(points);
    return { points, level, look: companionLook(level), toNextLevel: pointsToNextLevel(points) };
  }, []);
}

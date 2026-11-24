import { db } from '@/data/db';
import type { DayLog, GameDay } from '@/game/model';

export const dayLogRepository = {
  get(day: GameDay): Promise<DayLog | undefined> {
    return db.dayLogs.get(day);
  },

  async put(log: DayLog): Promise<void> {
    await db.dayLogs.put(log);
  },
};

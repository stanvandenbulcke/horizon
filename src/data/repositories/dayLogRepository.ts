import { db } from '@/data/db';
import type { DayLog, GameDay } from '@/game/model';

export const dayLogRepository = {
  /** Alle dagboekjes (voor groeipunten en later de streak). */
  listAll(): Promise<DayLog[]> {
    return db.dayLogs.toArray();
  },

  get(day: GameDay): Promise<DayLog | undefined> {
    return db.dayLogs.get(day);
  },

  async put(log: DayLog): Promise<void> {
    await db.dayLogs.put(log);
  },
};

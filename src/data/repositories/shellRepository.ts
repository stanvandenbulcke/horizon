import { db } from '@/data/db';
import type { GameDay, ShellTransaction } from '@/game/model';

export const shellRepository = {
  /** Het hele kasboek (ook ongedane regels; de spelregels filteren die eruit). */
  listAll(): Promise<ShellTransaction[]> {
    return db.shellTransactions.toArray();
  },

  listByDay(day: GameDay): Promise<ShellTransaction[]> {
    return db.shellTransactions.where('day').equals(day).toArray();
  },

  async put(transaction: ShellTransaction): Promise<void> {
    await db.shellTransactions.put(transaction);
  },
};

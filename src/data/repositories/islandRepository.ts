import { db } from '@/data/db';
import type { Id, Island } from '@/game/model';

export const islandRepository = {
  /** Alle eilanden die niet verwijderd zijn, de oudste eerst. */
  async list(): Promise<Island[]> {
    const islands = await db.islands.toArray();
    return islands
      .filter((island) => island.deletedAt === null)
      .sort((a, b) => a.createdAt - b.createdAt);
  },

  async get(id: Id): Promise<Island | undefined> {
    const island = await db.islands.get(id);
    return island?.deletedAt === null ? island : undefined;
  },

  async put(island: Island): Promise<void> {
    await db.islands.put(island);
  },
};

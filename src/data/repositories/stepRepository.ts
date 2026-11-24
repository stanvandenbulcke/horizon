import { db } from '@/data/db';
import type { Id, Step } from '@/game/model';

const isLive = (step: Step) => step.deletedAt === null;

export const stepRepository = {
  /** Alle stappen van alle eilanden (zonder verwijderde). */
  async listAll(): Promise<Step[]> {
    return (await db.steps.toArray()).filter(isLive);
  },

  async listByIsland(islandId: Id): Promise<Step[]> {
    return (await db.steps.where('islandId').equals(islandId).toArray()).filter(isLive);
  },

  async get(id: Id): Promise<Step | undefined> {
    const step = await db.steps.get(id);
    return step && isLive(step) ? step : undefined;
  },

  async put(step: Step): Promise<void> {
    await db.steps.put(step);
  },

  async putMany(steps: readonly Step[]): Promise<void> {
    await db.steps.bulkPut([...steps]);
  },
};

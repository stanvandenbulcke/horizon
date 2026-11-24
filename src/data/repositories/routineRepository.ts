import { db } from '@/data/db';
import type { Id, Routine } from '@/game/model';

export const routineRepository = {
  /** Alle routines die niet verwijderd zijn, in de zelfgekozen volgorde. */
  async list(): Promise<Routine[]> {
    const routines = await db.routines.orderBy('order').toArray();
    return routines.filter((routine) => routine.deletedAt === null);
  },

  async get(id: Id): Promise<Routine | undefined> {
    const routine = await db.routines.get(id);
    return routine?.deletedAt === null ? routine : undefined;
  },

  async put(routine: Routine): Promise<void> {
    await db.routines.put(routine);
  },

  async putMany(routines: readonly Routine[]): Promise<void> {
    await db.routines.bulkPut([...routines]);
  },
};

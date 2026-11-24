import { db } from '@/data/db';
import type { Id, Landmark } from '@/game/model';

const isLive = (landmark: Landmark) => landmark.deletedAt === null;

export const landmarkRepository = {
  /** Alle bezienswaardigheden van alle eilanden (zonder verwijderde). */
  async listAll(): Promise<Landmark[]> {
    return (await db.landmarks.toArray()).filter(isLive);
  },

  async listByIsland(islandId: Id): Promise<Landmark[]> {
    return (await db.landmarks.where('islandId').equals(islandId).toArray()).filter(isLive);
  },

  async get(id: Id): Promise<Landmark | undefined> {
    const landmark = await db.landmarks.get(id);
    return landmark && isLive(landmark) ? landmark : undefined;
  },

  async put(landmark: Landmark): Promise<void> {
    await db.landmarks.put(landmark);
  },

  async putMany(landmarks: readonly Landmark[]): Promise<void> {
    await db.landmarks.bulkPut([...landmarks]);
  },
};

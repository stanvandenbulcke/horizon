import { useLiveQuery } from 'dexie-react-hooks';
import { islandRepository } from '@/data/repositories/islandRepository';
import type { Id, Island } from '@/game/model';

/** Alle eilanden. `undefined` zolang ze laden. */
export function useIslands(): Island[] | undefined {
  return useLiveQuery(() => islandRepository.list(), []);
}

/** Eén eiland. `undefined` zolang het laadt, `null` als het niet (meer) bestaat. */
export function useIsland(id: Id | undefined): Island | null | undefined {
  return useLiveQuery(async () => (id ? ((await islandRepository.get(id)) ?? null) : null), [id]);
}

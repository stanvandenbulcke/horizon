import type { Id } from '@/game/model';

// De adressen van de eilandschermen
export const islandsPaths = {
  create: '/islands/new',
  detail: (id: Id) => `/islands/${id}`,
  edit: (id: Id) => `/islands/${id}/edit`,
  sideQuest: (id: Id) => `/islands/${id}/side-quest`,
  /** Patronen voor de router, met de id als variabele */
  detailPattern: '/islands/:islandId',
  editPattern: '/islands/:islandId/edit',
  sideQuestPattern: '/islands/:islandId/side-quest',
} as const;

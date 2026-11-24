import type { Id } from '@/game/model';

// De adressen van de eilandschermen
export const islandsPaths = {
  detail: (id: Id) => `/islands/${id}`,
  /** Patroon voor de router, met de id als variabele */
  detailPattern: '/islands/:islandId',
} as const;

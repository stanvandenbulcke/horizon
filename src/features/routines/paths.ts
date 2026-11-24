import type { Id } from '@/game/model';

// De adressen van de routineschermen
export const routinesPaths = {
  list: '/settings/routines',
  add: '/settings/routines/add',
  create: '/settings/routines/new',
  edit: (id: Id) => `/settings/routines/${id}`,
  /** Patroon voor de router, met de id als variabele */
  editPattern: '/settings/routines/:routineId',
} as const;

import { config } from '@/game/config';

/**
 * Hoeveel mist er nog boven een eiland hangt: 0 = helemaal weg, 1 = alles in de mist.
 * Een nieuw eiland zit grotendeels in de mist; met elke stap trekt ze verder op.
 */
export function fogLevel(progress: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  return config.map.startFog * (1 - clamped);
}

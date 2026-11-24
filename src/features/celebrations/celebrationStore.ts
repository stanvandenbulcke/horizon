/** Hoe groot het feest is: een stap of routine (klein), een bezienswaardigheid (middel), een eiland (groot). */
export type CelebrationLevel = 'small' | 'medium' | 'big';

export interface Celebration {
  /** Telt op bij elk feestje, zodat twee gelijke feestjes na elkaar toch allebei spelen */
  id: number;
  level: CelebrationLevel;
  /** Een jubeltekst om bovenaan te tonen (mag leeg) */
  message: string | null;
  /** Waar de partikels vandaan spatten (0–1 over het scherm), bv. vanaf de knop waarop je tikte */
  origin: { x: number; y: number } | null;
}

/*
 * Een piepkleine "winkel" voor feestjes: elk scherm kan een feestje vragen, en de feestlaag
 * (bovenaan de app) speelt het af. Zo hoeft geen enkel scherm zelf confetti te strooien.
 */
let current: Celebration | null = null;
let counter = 0;
const listeners = new Set<() => void>();

export function celebrate(
  level: CelebrationLevel,
  options: { message?: string | null; from?: Element | null } = {},
): void {
  counter += 1;
  current = {
    id: counter,
    level,
    message: options.message ?? null,
    origin: originOf(options.from),
  };
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function currentCelebration(): Celebration | null {
  return current;
}

function originOf(element: Element | null | undefined): Celebration['origin'] {
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  return {
    x: (rect.left + rect.width / 2) / window.innerWidth,
    y: (rect.top + rect.height / 2) / window.innerHeight,
  };
}

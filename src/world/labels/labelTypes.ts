/** Een naambordje boven iets op de kaart, met de plek in 3D waar het boven zweeft. */
export interface LabelAnchor {
  id: string;
  emoji: string;
  name: string;
  x: number;
  /** Hoogte boven het water */
  y: number;
  z: number;
  small: boolean;
}

/** De HTML-elementen van alle bordjes, per id, zodat ze verschoven kunnen worden. */
export type LabelElements = Map<string, HTMLElement>;

import { useFrame } from '@react-three/fiber';
import type { RefObject } from 'react';
import { Vector3 } from 'three';
import type { LabelAnchor, LabelElements } from './labelTypes';

interface LabelTrackerProps {
  anchors: readonly LabelAnchor[];
  elements: RefObject<LabelElements>;
}

// Eén hulpvector die we steeds hergebruiken (geen nieuw object per frame)
const projected = new Vector3();

/**
 * Berekent bij elke getekende frame waar elk naambordje op het scherm moet staan,
 * en schuift het HTML-element daarheen. Zonder React opnieuw te laten tekenen: dat is zuinig.
 */
export function LabelTracker({ anchors, elements }: LabelTrackerProps) {
  useFrame(({ camera, size }) => {
    for (const anchor of anchors) {
      const element = elements.current.get(anchor.id);
      if (!element) continue;
      projected.set(anchor.x, anchor.y, anchor.z).project(camera);
      const x = ((projected.x + 1) / 2) * size.width;
      const y = ((1 - projected.y) / 2) * size.height;
      element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -100%)`;
    }
  });
  return null;
}

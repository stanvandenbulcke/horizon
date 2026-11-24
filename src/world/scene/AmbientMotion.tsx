import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { worldConfig } from '@/world/worldConfig';

/**
 * Houdt de golfjes en wolkjes in beweging, maar alleen nog even na je laatste aanraking.
 * Daarna staat de wereld stil en tekent je iPhone niets meer: dat spaart batterij.
 * Wie op de iPhone "minder beweging" heeft aangezet, krijgt helemaal geen golfjes.
 */
export function AmbientMotion() {
  const invalidate = useThree((state) => state.invalidate);
  const canvas = useThree((state) => state.gl.domElement);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    let awakeUntil = 0;
    let frame = 0;

    const tick = () => {
      if (document.visibilityState === 'visible' && performance.now() < awakeUntil) {
        invalidate();
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const wake = () => {
      awakeUntil = performance.now() + worldConfig.ambientAwakeMs;
      if (frame === 0) frame = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible') wake();
    };

    wake();
    canvas.addEventListener('pointerdown', wake);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener('pointerdown', wake);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [invalidate, canvas]);

  return null;
}

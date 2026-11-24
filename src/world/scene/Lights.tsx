import { worldConfig } from '@/world/worldConfig';
import type { TimeOfDayPalette } from './timeOfDay';

interface LightsProps {
  palette: TimeOfDayPalette;
}

/**
 * Het licht: een zacht licht van boven (lucht) en onder (zand), plus de zon.
 * Geen echte schaduwen: die kosten veel batterij en de low-poly vlakjes geven al diepte.
 */
export function Lights({ palette }: LightsProps) {
  return (
    <>
      <hemisphereLight args={[palette.hemiSky, palette.hemiGround, 1.6]} />
      <directionalLight
        color={palette.sunColor}
        intensity={palette.sunIntensity}
        position={[...worldConfig.sunDirection]}
      />
    </>
  );
}

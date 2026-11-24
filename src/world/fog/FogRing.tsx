import { useMemo } from 'react';
import { worldConfig } from '@/world/worldConfig';
import { ringPuffs } from './cloudLayout';
import { Clouds } from './Clouds';

interface FogRingProps {
  /** Waar de ring begint (vanaf het midden van de kaart) */
  radius: number;
}

/** De mist rond de bekende wereld. Hoe meer eilanden, hoe verder de ring naar buiten schuift. */
export function FogRing({ radius }: FogRingProps) {
  const puffs = useMemo(() => ringPuffs('ring', radius, worldConfig.fog.ringPuffs), [radius]);
  return <Clouds puffs={puffs} />;
}

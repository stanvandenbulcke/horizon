import { useEffect, useMemo } from 'react';
import { materials } from '@/world/materials';
import { organicCylinder } from './organicCylinder';

interface IslandBaseProps {
  radius: number;
  /** Zaadje voor de vorm, zodat elk eiland een eigen rand heeft */
  seed: string;
}

/** De grond van een eiland: een strand van zand met een grasheuvel erop. */
export function IslandBase({ radius, seed }: IslandBaseProps) {
  const geometry = useMemo(
    () => ({
      sand: organicCylinder(radius, radius * 1.15, 0.9, 10, `${seed}-sand`),
      grass: organicCylinder(radius * 0.74, radius * 0.84, 0.45, 9, `${seed}-grass`),
    }),
    [radius, seed],
  );

  useEffect(
    () => () => {
      geometry.sand.dispose();
      geometry.grass.dispose();
    },
    [geometry],
  );

  return (
    <group>
      <mesh geometry={geometry.sand} material={materials.sand} position={[0, -0.25, 0]} />
      <mesh geometry={geometry.grass} material={materials.grass} position={[0, 0.425, 0]} />
    </group>
  );
}

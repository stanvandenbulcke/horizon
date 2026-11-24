import type { ThreeElements } from '@react-three/fiber';
import { materials, tintMaterial } from '@/world/materials';
import { shapes } from './shapes';

type LighthouseProps = ThreeElements['group'] & {
  /** De kleur van de strepen (de kleur van het eiland) */
  color: string;
  /** Een slapend eiland heeft zijn licht uit */
  lit: boolean;
};

const BANDS = 3;
const BAND_HEIGHT = 0.5;

/** Een gestreepte vuurtoren: het doel bovenaan een pad-eiland. */
export function Lighthouse({ color, lit, ...props }: LighthouseProps) {
  const stripe = tintMaterial(color);
  const towerTop = 0.3 + BANDS * BAND_HEIGHT;
  return (
    <group {...props}>
      <mesh
        geometry={shapes.cylinder}
        material={materials.rock}
        position={[0, 0.15, 0]}
        scale={[1.1, 0.3, 1.1]}
      />
      {Array.from({ length: BANDS }, (_, i) => (
        <mesh
          key={i}
          geometry={shapes.taperedCylinder}
          material={i % 2 === 0 ? materials.white : stripe}
          position={[0, 0.3 + i * BAND_HEIGHT + BAND_HEIGHT / 2, 0]}
          scale={[0.8 - i * 0.1, BAND_HEIGHT, 0.8 - i * 0.1]}
        />
      ))}
      <mesh
        geometry={shapes.cylinder}
        material={materials.metal}
        position={[0, towerTop + 0.05, 0]}
        scale={[0.85, 0.1, 0.85]}
      />
      <mesh
        geometry={shapes.cylinder}
        material={lit ? materials.lampOn : materials.lampOff}
        position={[0, towerTop + 0.3, 0]}
        scale={[0.42, 0.4, 0.42]}
      />
      <mesh
        geometry={shapes.cone}
        material={stripe}
        position={[0, towerTop + 0.72, 0]}
        scale={[0.7, 0.45, 0.7]}
      />
    </group>
  );
}

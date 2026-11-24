import type { ThreeElements } from '@react-three/fiber';
import { materials, tintMaterial } from '@/world/materials';
import { shapes } from './shapes';

type FlagProps = ThreeElements['group'] & {
  color: string;
};

/** Een vlaggetje op een paal, in de kleur van het eiland. */
export function Flag({ color, ...props }: FlagProps) {
  return (
    <group {...props}>
      <mesh
        geometry={shapes.cylinder}
        material={materials.woodDark}
        position={[0, 0.7, 0]}
        scale={[0.07, 1.4, 0.07]}
      />
      <mesh
        geometry={shapes.box}
        material={tintMaterial(color)}
        position={[0.28, 1.2, 0]}
        scale={[0.55, 0.36, 0.05]}
      />
    </group>
  );
}

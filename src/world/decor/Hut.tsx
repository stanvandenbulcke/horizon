import type { ThreeElements } from '@react-three/fiber';
import { materials } from '@/world/materials';
import { shapes } from './shapes';

type HutProps = ThreeElements['group'];

/** Een gezellig hutje met een rood puntdak: het huis van je reisgezel. */
export function Hut(props: HutProps) {
  return (
    <group {...props}>
      <mesh
        geometry={shapes.box}
        material={materials.wood}
        position={[0, 0.38, 0]}
        scale={[1.1, 0.76, 1]}
      />
      <mesh
        geometry={shapes.pyramid}
        material={materials.roof}
        position={[0, 1.08, 0]}
        rotation={[0, Math.PI / 4, 0]}
        scale={[1.75, 0.75, 1.75]}
      />
      {/* Deur en raampje */}
      <mesh
        geometry={shapes.box}
        material={materials.woodDark}
        position={[0.15, 0.28, 0.51]}
        scale={[0.3, 0.5, 0.04]}
      />
      <mesh
        geometry={shapes.box}
        material={materials.lampOn}
        position={[-0.3, 0.45, 0.51]}
        scale={[0.22, 0.2, 0.04]}
      />
    </group>
  );
}

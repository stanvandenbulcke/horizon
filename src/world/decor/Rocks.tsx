import type { ThreeElements } from '@react-three/fiber';
import { materials } from '@/world/materials';
import { shapes } from './shapes';

type RocksProps = ThreeElements['group'];

/** Een paar grijze rotsjes. */
export function Rocks(props: RocksProps) {
  return (
    <group {...props}>
      <mesh geometry={shapes.rock} material={materials.rock} scale={[0.7, 0.5, 0.6]} />
      <mesh
        geometry={shapes.rock}
        material={materials.rock}
        position={[0.45, -0.05, 0.2]}
        scale={[0.4, 0.35, 0.4]}
        rotation={[0.4, 0.8, 0]}
      />
    </group>
  );
}

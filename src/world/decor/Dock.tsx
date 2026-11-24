import type { ThreeElements } from '@react-three/fiber';
import { materials } from '@/world/materials';
import { shapes } from './shapes';

type DockProps = ThreeElements['group'];

const PLANKS = 5;

/** Een houten steigertje dat in het water steekt, waar je boot aanmeert. */
export function Dock(props: DockProps) {
  return (
    <group {...props}>
      {Array.from({ length: PLANKS }, (_, i) => (
        <mesh
          key={i}
          geometry={shapes.box}
          material={i % 2 === 0 ? materials.wood : materials.woodDark}
          position={[i * 0.34, 0.32, 0]}
          scale={[0.3, 0.08, 0.9]}
        />
      ))}
      {[0.3, 1.3].map((x) => (
        <group key={x}>
          <mesh
            geometry={shapes.cylinder}
            material={materials.woodDark}
            position={[x, 0.1, 0.42]}
            scale={[0.1, 0.6, 0.1]}
          />
          <mesh
            geometry={shapes.cylinder}
            material={materials.woodDark}
            position={[x, 0.1, -0.42]}
            scale={[0.1, 0.6, 0.1]}
          />
        </group>
      ))}
    </group>
  );
}

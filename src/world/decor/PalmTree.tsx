import type { ThreeElements } from '@react-three/fiber';
import { materials } from '@/world/materials';
import { shapes } from './shapes';

type PalmTreeProps = ThreeElements['group'];

const TRUNK_SEGMENTS = 4;
const LEAVES = 6;

/** Een chunky palmboom: een licht gebogen stam met een kroon van bladeren. */
export function PalmTree(props: PalmTreeProps) {
  const top = TRUNK_SEGMENTS * 0.42;
  return (
    <group {...props}>
      {Array.from({ length: TRUNK_SEGMENTS }, (_, i) => (
        <mesh
          key={i}
          geometry={shapes.taperedCylinder}
          material={materials.trunk}
          position={[i * i * 0.025, i * 0.42 + 0.21, 0]}
          scale={[0.26 - i * 0.025, 0.44, 0.26 - i * 0.025]}
          rotation={[0, 0, -i * 0.06]}
        />
      ))}
      <group position={[0.24, top, 0]}>
        {Array.from({ length: LEAVES }, (_, i) => (
          <group key={i} rotation={[0, (i / LEAVES) * Math.PI * 2, 0]}>
            <mesh
              geometry={shapes.pyramid}
              material={i % 2 === 0 ? materials.leaf : materials.leafDark}
              position={[0.55, -0.12, 0]}
              rotation={[0, 0, -1.95]}
              scale={[0.42, 1.25, 0.16]}
            />
          </group>
        ))}
        <mesh
          geometry={shapes.rock}
          material={materials.coconut}
          position={[0.08, -0.12, 0.1]}
          scale={0.18}
        />
        <mesh
          geometry={shapes.rock}
          material={materials.coconut}
          position={[-0.06, -0.14, -0.08]}
          scale={0.16}
        />
      </group>
    </group>
  );
}

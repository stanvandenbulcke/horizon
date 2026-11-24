import { useFrame } from '@react-three/fiber';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { IcosahedronGeometry, type InstancedMesh, Object3D } from 'three';
import { materials } from '@/world/materials';
import type { Puff } from './cloudLayout';

interface CloudsProps {
  puffs: readonly Puff[];
}

const helper = new Object3D();

/**
 * Een groep mistwolkjes die zachtjes dobberen. Alle wolkjes worden in één keer getekend
 * (een "instanced mesh"), dat is veel zuiniger dan elk wolkje apart.
 */
export function Clouds({ puffs }: CloudsProps) {
  const mesh = useRef<InstancedMesh>(null);
  const geometry = useMemo(() => new IcosahedronGeometry(1, 1), []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const place = (time: number) => {
    const instance = mesh.current;
    if (!instance) return;
    puffs.forEach((puff, index) => {
      const bob = Math.sin(time * 0.6 + puff.phase) * 0.08;
      helper.position.set(puff.x, puff.y + bob, puff.z);
      helper.scale.set(puff.scale, puff.scale * 0.7, puff.scale);
      helper.updateMatrix();
      instance.setMatrixAt(index, helper.matrix);
    });
    instance.instanceMatrix.needsUpdate = true;
  };

  useLayoutEffect(() => place(0));
  useFrame(({ clock }) => place(clock.elapsedTime));

  if (puffs.length === 0) return null;

  return (
    <instancedMesh
      // Een nieuwe key bij een ander aantal wolkjes, want de grootte ligt vast bij het maken
      key={puffs.length}
      ref={mesh}
      args={[geometry, materials.cloud, puffs.length]}
      // Mist vangt geen tikken op: je tikt er gewoon door naar het eiland
      raycast={() => null}
    />
  );
}

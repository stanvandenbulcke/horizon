import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { Color, PlaneGeometry, type ShaderMaterial, Vector3 } from 'three';
import { worldConfig } from '@/world/worldConfig';
import { seaFragmentShader, seaVertexShader } from './seaShader';

interface SeaProps {
  shallow: string;
  deep: string;
  lightDirection: readonly [number, number, number];
}

/** De zee met zachte low-poly golfjes. */
export function Sea({ shallow, deep, lightDirection }: SeaProps) {
  const material = useRef<ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const { size, segments } = worldConfig.sea;
    const plane = new PlaneGeometry(size, size, segments, segments);
    // Een vlak ligt standaard rechtop; we leggen het plat
    plane.rotateX(-Math.PI / 2);
    return plane;
  }, []);

  // De startwaarden voor de shader (de tijd loopt daarna vanzelf op)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uShallow: { value: new Color() },
      uDeep: { value: new Color() },
      uLightDir: { value: new Vector3() },
    }),
    [],
  );
  const shallowColor = useMemo(() => new Color(shallow), [shallow]);
  const deepColor = useMemo(() => new Color(deep), [deep]);
  const light = useMemo(() => new Vector3(...lightDirection), [lightDirection]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    const time = material.current?.uniforms.uTime;
    if (time) time.value = clock.elapsedTime;
  });

  // De zee vangt geen tikken op, zodat je er gewoon over kan schuiven
  return (
    <mesh geometry={geometry} raycast={() => null}>
      <shaderMaterial
        ref={material}
        vertexShader={seaVertexShader}
        fragmentShader={seaFragmentShader}
        uniforms={uniforms}
        uniforms-uShallow-value={shallowColor}
        uniforms-uDeep-value={deepColor}
        uniforms-uLightDir-value={light}
      />
    </mesh>
  );
}

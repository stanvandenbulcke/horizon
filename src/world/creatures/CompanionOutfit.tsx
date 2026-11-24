import { shapes } from '@/world/decor/shapes';
import { materials } from '@/world/materials';

interface CompanionOutfitProps {
  /** 0 = niets, 1 = sjaal, 2 = + piratenhoed, 3 = + gouden kroon in plaats van hoed */
  look: number;
}

/** De looks die je reisgezel vrijspeelt op level 3, 6 en 10. */
export function CompanionOutfit({ look }: CompanionOutfitProps) {
  return (
    <>
      {look >= 1 && (
        <mesh
          geometry={shapes.ring}
          material={materials.scarf}
          position={[0, 0.3, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.4, 0.4, 0.5]}
        />
      )}
      {look === 2 && (
        <group position={[0, 0.9, 0]}>
          <mesh geometry={shapes.cylinder} material={materials.hat} scale={[0.62, 0.05, 0.42]} />
          <mesh
            geometry={shapes.cone}
            material={materials.hat}
            position={[0, 0.14, 0]}
            scale={[0.38, 0.26, 0.3]}
          />
        </group>
      )}
      {look >= 3 && (
        <group position={[0, 0.92, 0]}>
          <mesh
            geometry={shapes.ring}
            material={materials.gold}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.2, 0.2, 0.4]}
          />
          {[0, 1, 2, 3, 4].map((i) => {
            const angle = (i / 5) * Math.PI * 2;
            return (
              <mesh
                key={i}
                geometry={shapes.cone}
                material={materials.gold}
                position={[Math.cos(angle) * 0.2, 0.08, Math.sin(angle) * 0.2]}
                scale={[0.06, 0.14, 0.06]}
              />
            );
          })}
        </group>
      )}
    </>
  );
}

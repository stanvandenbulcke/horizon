import { shapes } from '@/world/decor/shapes';
import { materials, tintMaterial } from '@/world/materials';
import type { GardenPlant } from './gardenLayout';

interface PlantProps {
  plant: GardenPlant;
}

/** Eén plantje in de tuin: een bloem, een struikje of een boompje. */
export function Plant({ plant }: PlantProps) {
  if (plant.kind === 'bush') {
    return (
      <group position={[plant.x, 0, plant.z]} scale={plant.scale}>
        <mesh
          geometry={shapes.sphere}
          material={materials.leaf}
          position={[0, 0.16, 0]}
          scale={0.2}
        />
        <mesh
          geometry={shapes.sphere}
          material={materials.leafDark}
          position={[0.12, 0.12, 0.05]}
          scale={0.14}
        />
      </group>
    );
  }
  if (plant.kind === 'sapling') {
    return (
      <group position={[plant.x, 0, plant.z]} scale={plant.scale}>
        <mesh
          geometry={shapes.cylinder}
          material={materials.trunk}
          position={[0, 0.15, 0]}
          scale={[0.06, 0.3, 0.06]}
        />
        <mesh
          geometry={shapes.cone}
          material={materials.leaf}
          position={[0, 0.42, 0]}
          scale={[0.32, 0.4, 0.32]}
        />
      </group>
    );
  }
  return (
    <group position={[plant.x, 0, plant.z]} scale={plant.scale}>
      <mesh
        geometry={shapes.cylinder}
        material={materials.leafDark}
        position={[0, 0.12, 0]}
        scale={[0.03, 0.24, 0.03]}
      />
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            geometry={shapes.sphere}
            material={tintMaterial(plant.color)}
            position={[Math.cos(angle) * 0.07, 0.26, Math.sin(angle) * 0.07]}
            scale={0.055}
          />
        );
      })}
      <mesh
        geometry={shapes.sphere}
        material={materials.petalCenter}
        position={[0, 0.27, 0]}
        scale={0.045}
      />
    </group>
  );
}

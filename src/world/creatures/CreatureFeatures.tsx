import type { CreatureSpecies } from '@/game/creatures/creature';
import { shapes } from '@/world/decor/shapes';
import { creatureMaterial, materials } from '@/world/materials';

interface CreatureFeaturesProps {
  species: CreatureSpecies;
  color: string;
}

/** Wat elke soort eigen heeft: oortjes, hoorntjes, vleugeltjes of een antenne. */
export function CreatureFeatures({ species, color }: CreatureFeaturesProps) {
  const body = creatureMaterial(color);
  const light = creatureMaterial(color, true);

  if (species === 'bunny') {
    return (
      <>
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.15, 0.95, -0.02]} rotation={[0, 0, side * -0.18]}>
            <mesh geometry={shapes.sphere} material={body} scale={[0.09, 0.28, 0.07]} />
            <mesh
              geometry={shapes.sphere}
              material={materials.cheek}
              position={[0, 0.02, 0.05]}
              scale={[0.05, 0.2, 0.03]}
            />
          </group>
        ))}
      </>
    );
  }

  if (species === 'kitten') {
    return (
      <>
        {[-1, 1].map((side) => (
          <mesh
            key={side}
            geometry={shapes.pyramid}
            material={body}
            position={[side * 0.22, 0.86, 0]}
            rotation={[0, Math.PI / 4, side * -0.25]}
            scale={[0.22, 0.24, 0.22]}
          />
        ))}
      </>
    );
  }

  if (species === 'dragon') {
    return (
      <>
        {[-1, 1].map((side) => (
          <group key={side}>
            <mesh
              geometry={shapes.cone}
              material={materials.horn}
              position={[side * 0.16, 0.9, 0]}
              rotation={[0, 0, side * -0.3]}
              scale={[0.09, 0.2, 0.09]}
            />
            <mesh
              geometry={shapes.pyramid}
              material={light}
              position={[side * 0.5, 0.52, -0.1]}
              rotation={[0.2, 0, side * -1.2]}
              scale={[0.28, 0.3, 0.06]}
            />
          </group>
        ))}
      </>
    );
  }

  // blob: een antenne met een bolletje
  return (
    <>
      <mesh
        geometry={shapes.cylinder}
        material={body}
        position={[0, 0.97, 0]}
        scale={[0.03, 0.2, 0.03]}
      />
      <mesh geometry={shapes.sphere} material={light} position={[0, 1.1, 0]} scale={0.07} />
    </>
  );
}

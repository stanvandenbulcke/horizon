import { type ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import type { Group } from 'three';
import type { CreatureSpecies } from '@/game/creatures/creature';
import { shapes } from '@/world/decor/shapes';
import { creatureMaterial, materials } from '@/world/materials';
import { CompanionOutfit } from './CompanionOutfit';
import { CreatureFeatures } from './CreatureFeatures';

type CreatureProps = ThreeElements['group'] & {
  species: CreatureSpecies;
  color: string;
  /** Dansen in plaats van zachtjes stuiteren (bv. op een afgewerkt eiland) */
  dancing?: boolean;
  /** Alleen voor je reisgezel: de look die hij vrijspeelde (0 tot 3) */
  look?: number;
};

const BLINK_EVERY = 4.2;
const BLINK_TIME = 0.13;

/**
 * Een schattig wezentje uit eenvoudige vormen: een rond lijfje, grote ogen, wangetjes en voetjes.
 * Het stuitert met "squash and stretch", knippert met zijn ogen, en danst als het feest is.
 */
export function Creature({ species, color, dancing = false, look = 0, ...props }: CreatureProps) {
  const body = useRef<Group>(null);
  const eyes = useRef<Group>(null);
  // Elk wezentje beweegt een beetje anders, zodat ze niet allemaal tegelijk stuiteren
  const [phase] = useState(() => Math.random() * 10);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + phase;
    const speed = dancing ? 6 : 2.4;
    const hop = Math.abs(Math.sin(t * speed)) * (dancing ? 0.32 : 0.1);
    const squash = 1 - Math.max(0, 0.06 - hop) * 3;
    if (body.current) {
      body.current.position.y = hop;
      body.current.scale.set(2 - squash, squash, 2 - squash);
      body.current.rotation.y = dancing ? Math.sin(t * 3) * 0.6 : 0;
    }
    if (eyes.current) {
      eyes.current.scale.y = t % BLINK_EVERY < BLINK_TIME ? 0.1 : 1;
    }
  });

  const skin = creatureMaterial(color);
  const belly = creatureMaterial(color, true);

  return (
    <group {...props}>
      <group ref={body}>
        <mesh
          geometry={shapes.sphere}
          material={skin}
          position={[0, 0.46, 0]}
          scale={[0.5, 0.46, 0.48]}
        />
        <mesh
          geometry={shapes.sphere}
          material={belly}
          position={[0, 0.38, 0.22]}
          scale={[0.32, 0.3, 0.28]}
        />
        <group ref={eyes} position={[0, 0.58, 0.36]}>
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.17, 0, 0]}>
              <mesh geometry={shapes.sphere} material={materials.eyeWhite} scale={0.12} />
              <mesh
                geometry={shapes.sphere}
                material={materials.pupil}
                position={[0, -0.01, 0.07]}
                scale={0.07}
              />
              <mesh
                geometry={shapes.sphere}
                material={materials.eyeWhite}
                position={[0.03, 0.03, 0.12]}
                scale={0.022}
              />
            </group>
          ))}
        </group>
        {[-1, 1].map((side) => (
          <group key={side}>
            <mesh
              geometry={shapes.sphere}
              material={materials.cheek}
              position={[side * 0.3, 0.44, 0.33]}
              scale={[0.07, 0.04, 0.03]}
            />
            <mesh
              geometry={shapes.sphere}
              material={skin}
              position={[side * 0.2, 0.06, 0.12]}
              scale={[0.13, 0.07, 0.16]}
            />
          </group>
        ))}
        <CreatureFeatures species={species} color={color} />
        <CompanionOutfit look={look} />
      </group>
    </group>
  );
}

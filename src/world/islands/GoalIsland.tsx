import { useMemo } from 'react';
import { BridgeSpan } from '@/world/decor/BridgeSpan';
import { Flag } from '@/world/decor/Flag';
import { Lighthouse } from '@/world/decor/Lighthouse';
import { PalmTree } from '@/world/decor/PalmTree';
import { Rocks } from '@/world/decor/Rocks';
import { clusterPuffs } from '@/world/fog/cloudLayout';
import { Clouds } from '@/world/fog/Clouds';
import { onTap } from '@/world/scene/tap';
import type { MapIsland } from '@/world/types';
import { worldConfig } from '@/world/worldConfig';
import { IslandBase } from './IslandBase';

interface GoalIslandProps {
  island: MapIsland;
  onSelect: (id: string) => void;
}

/**
 * Een doeleiland: een pad-eiland krijgt een vuurtoren, een brug-eiland een vlag.
 * Boven het eiland hangt mist, die optrekt naarmate je vordert.
 */
export function GoalIsland({ island, onSelect }: GoalIslandProps) {
  const { goalRadius, sideQuestRadius, landHeight } = worldConfig.island;
  const radius = island.sideQuest ? sideQuestRadius : goalRadius;
  const scale = radius / goalRadius;
  const maxPuffs = island.sideQuest
    ? worldConfig.fog.puffsPerSideQuest
    : worldConfig.fog.puffsPerIsland;
  const puffCount = Math.round(maxPuffs * island.fog);

  const puffs = useMemo(
    () => clusterPuffs(island.id, radius * 1.1, puffCount),
    [island.id, radius, puffCount],
  );

  // Een brug komt aan de kant van je thuiseiland en groeit naar het eiland toe
  const toHome = Math.atan2(-island.position.z, -island.position.x);
  const bridgeStart = radius + worldConfig.bridge.length + 0.2;

  return (
    <group position={[island.position.x, 0, island.position.z]}>
      <group onClick={onTap(() => onSelect(island.id))}>
        <IslandBase radius={radius} seed={island.id} />
        <group position={[0, landHeight, 0]} scale={scale}>
          {island.type === 'path' ? (
            <Lighthouse color={island.color} lit={!island.sleeping} position={[-0.4, 0, -0.4]} />
          ) : (
            <Flag color={island.color} position={[-0.3, 0, -0.3]} scale={1.3} />
          )}
          <PalmTree position={[0.9, 0, 0.5]} rotation={[0, 2, 0]} scale={0.8} />
          <Rocks position={[0.4, 0, -1.2]} scale={0.6} />
        </group>
      </group>
      {island.type === 'bridge' && (
        <BridgeSpan
          progress={island.progress}
          color={island.color}
          position={[Math.cos(toHome) * bridgeStart, 0, Math.sin(toHome) * bridgeStart]}
          // De brug wijst van de steiger naar het eiland (weg van je thuiseiland)
          rotationY={-(toHome + Math.PI)}
        />
      )}
      <Clouds puffs={puffs} />
    </group>
  );
}

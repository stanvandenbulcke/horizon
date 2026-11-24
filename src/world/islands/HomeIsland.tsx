import { Dock } from '@/world/decor/Dock';
import { Flag } from '@/world/decor/Flag';
import { Hut } from '@/world/decor/Hut';
import { PalmTree } from '@/world/decor/PalmTree';
import { Rocks } from '@/world/decor/Rocks';
import { onTap } from '@/world/scene/tap';
import { worldConfig } from '@/world/worldConfig';
import { IslandBase } from './IslandBase';

interface HomeIslandProps {
  onSelect: () => void;
}

const HOME_FLAG = '#ffc53d';

/** Je thuiseiland in het midden van de kaart, met het hutje van je reisgezel. */
export function HomeIsland({ onSelect }: HomeIslandProps) {
  const { homeRadius, landHeight } = worldConfig.island;
  return (
    <group onClick={onTap(onSelect)}>
      <IslandBase radius={homeRadius} seed="home" />
      <group position={[0, landHeight, 0]}>
        <Hut position={[-0.6, 0, -0.5]} rotation={[0, Math.PI / 4, 0]} />
        <PalmTree position={[1.2, 0, -1.1]} rotation={[0, 1, 0]} />
        <PalmTree position={[-1.7, 0, 0.7]} rotation={[0, 2.4, 0]} scale={0.85} />
        <PalmTree position={[0.6, 0, 1.5]} rotation={[0, 4, 0]} scale={0.7} />
        <Flag color={HOME_FLAG} position={[-1.3, 0, -1.4]} />
      </group>
      <Dock position={[2.3, 0, 1.7]} rotation={[0, -Math.PI / 4, 0]} />
      <Rocks position={[-3, 0.1, -0.9]} />
    </group>
  );
}

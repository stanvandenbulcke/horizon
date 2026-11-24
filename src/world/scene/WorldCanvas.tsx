import { Canvas } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { mapTexts } from '@/content/texts/map';
import { config } from '@/game/config';
import { mapRadius } from '@/game/islands/placement';
import { FogRing } from '@/world/fog/FogRing';
import { GoalIsland } from '@/world/islands/GoalIsland';
import { HomeIsland } from '@/world/islands/HomeIsland';
import { LabelTracker } from '@/world/labels/LabelTracker';
import type { LabelAnchor, LabelElements } from '@/world/labels/labelTypes';
import { MapLabels } from '@/world/labels/MapLabels';
import { Sea } from '@/world/sea/Sea';
import type { HomeView, MapIsland } from '@/world/types';
import { worldConfig } from '@/world/worldConfig';
import { AmbientMotion } from './AmbientMotion';
import { CameraRig } from './CameraRig';
import { Lights } from './Lights';
import { timeOfDayPalette } from './timeOfDay';
import styles from './WorldCanvas.module.css';

interface WorldCanvasProps {
  islands: readonly MapIsland[];
  home: HomeView;
  onIslandSelect: (id: string) => void;
  onHomeSelect: () => void;
}

/** Waar de naambordjes boven de eilanden zweven. */
function labelAnchors(islands: readonly MapIsland[]): LabelAnchor[] {
  const { labelHeight } = worldConfig;
  return [
    {
      id: 'home',
      emoji: '🏝️',
      name: mapTexts.homeLabel,
      x: 0,
      y: labelHeight.home,
      z: 0,
      small: false,
    },
    ...islands.map((island) => ({
      id: island.id,
      emoji: island.emoji,
      name: island.name,
      x: island.position.x,
      y: island.sideQuest ? labelHeight.sideQuest : labelHeight.goal,
      z: island.position.z,
      small: island.sideQuest,
    })),
  ];
}

/**
 * De hele 3D-levenskaart: zee, thuiseiland, doeleilanden, mist en naambordjes.
 * Tekent alleen als er iets beweegt (`frameloop="demand"`), om batterij te sparen.
 */
export function WorldCanvas({ islands, home, onIslandSelect, onHomeSelect }: WorldCanvasProps) {
  const palette = useMemo(() => timeOfDayPalette(new Date().getHours()), []);
  const labels = useMemo(() => labelAnchors(islands), [islands]);
  const labelElements = useRef<LabelElements>(new Map());
  const radius = mapRadius(islands.map((island) => island.position));
  const { offset, startZoom } = worldConfig.camera;

  return (
    <div className={styles.container}>
      <Canvas
        orthographic
        flat
        frameloop="demand"
        dpr={[1, 2]}
        camera={{ position: [...offset], zoom: startZoom, near: 1, far: 300 }}
      >
        <color attach="background" args={[palette.sky]} />
        <Lights palette={palette} />
        <CameraRig limit={Math.max(worldConfig.minPanLimit, radius + worldConfig.panMargin)} />
        <Sea
          shallow={palette.seaShallow}
          deep={palette.seaDeep}
          lightDirection={worldConfig.sunDirection}
        />
        <HomeIsland home={home} onSelect={onHomeSelect} />
        {islands.map((island) => (
          <GoalIsland key={island.id} island={island} onSelect={onIslandSelect} />
        ))}
        <FogRing radius={Math.max(radius, config.map.firstRing) + worldConfig.fog.ringDistance} />
        <LabelTracker anchors={labels} elements={labelElements} />
        <AmbientMotion />
      </Canvas>
      <MapLabels labels={labels} elements={labelElements} />
    </div>
  );
}

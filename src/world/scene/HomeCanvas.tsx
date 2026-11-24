import { Canvas } from '@react-three/fiber';
import { useEffect, useMemo, useState } from 'react';
import { HomeIsland } from '@/world/islands/HomeIsland';
import { Sea } from '@/world/sea/Sea';
import type { HomeView } from '@/world/types';
import { worldConfig } from '@/world/worldConfig';
import { AmbientMotion } from './AmbientMotion';
import { Lights } from './Lights';
import { timeOfDayPalette } from './timeOfDay';
import styles from './HomeCanvas.module.css';

interface HomeCanvasProps {
  home: HomeView;
  /** Wordt aangeroepen als je op je reisgezel tikt */
  onCompanionTap: () => void;
}

const DANCE_MS = 1800;

/**
 * Een close-up van je thuiseiland, bovenaan het Thuis-scherm: je reisgezel en zijn tuin.
 * Tik op je reisgezel en hij doet een dansje.
 */
export function HomeCanvas({ home, onCompanionTap }: HomeCanvasProps) {
  const palette = useMemo(() => timeOfDayPalette(new Date().getHours()), []);
  const [dancing, setDancing] = useState(false);

  useEffect(() => {
    if (!dancing) return;
    const timer = window.setTimeout(() => setDancing(false), DANCE_MS);
    return () => window.clearTimeout(timer);
  }, [dancing]);

  return (
    <div className={styles.container}>
      <Canvas
        orthographic
        flat
        frameloop="demand"
        dpr={[1, 2]}
        camera={{ position: [12, 9, 12], zoom: 46, near: 1, far: 200 }}
        // Een beetje ingezoomd op je reisgezel, voor zijn hutje
        onCreated={({ camera }) => camera.lookAt(0.3, 0.8, 0.4)}
      >
        <color attach="background" args={[palette.sky]} />
        <Lights palette={palette} />
        <Sea
          shallow={palette.seaShallow}
          deep={palette.seaDeep}
          lightDirection={worldConfig.sunDirection}
        />
        <HomeIsland
          home={home}
          onSelect={() => undefined}
          companionDancing={dancing}
          onCompanionSelect={() => {
            setDancing(true);
            onCompanionTap();
          }}
        />
        <AmbientMotion />
      </Canvas>
    </div>
  );
}

import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { mapTexts } from '@/content/texts/map';
import { useIslandsWithProgress } from '@/data/hooks/useIslands';
import { homePaths } from '@/features/home';
import { islandsPaths } from '@/features/islands';
import { Button } from '@/ui/Button';
import { Notice } from '@/ui/Notice';
import { WorldCanvas } from '@/world/scene/WorldCanvas';
import { toMapIsland } from './mapIslandView';
import styles from './MapScreen.module.css';

/**
 * 🗺️ Kaart: je levenskaart in 3D. Tik op een eiland om het te openen.
 * Dit scherm (met alle 3D) wordt pas geladen als je de Kaart-tab opent.
 */
export default function MapScreen() {
  const navigate = useNavigate();
  const islands = useIslandsWithProgress();
  const mapIslands = useMemo(
    () =>
      (islands ?? [])
        .filter(({ island }) => island.status !== 'drifted')
        .map(({ island, progress }) => toMapIsland(island, progress)),
    [islands],
  );
  const createIsland = () => void navigate(islandsPaths.create);

  return (
    <div className={styles.map}>
      <WorldCanvas
        islands={mapIslands}
        onIslandSelect={(id) => void navigate(islandsPaths.detail(id))}
        onHomeSelect={() => void navigate(homePaths.root)}
      />
      <div className={styles.overlay}>
        {islands?.length === 0 ? (
          <Notice
            icon={mapTexts.noIslands.icon}
            title={mapTexts.noIslands.title}
            text={mapTexts.noIslands.text}
          >
            <Button onClick={createIsland}>{mapTexts.noIslands.button}</Button>
          </Notice>
        ) : (
          <div className={styles.actions}>
            <Button onClick={createIsland}>{mapTexts.newIsland}</Button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { mapTexts } from '@/content/texts/map';
import { useIslands } from '@/data/hooks/useIslands';
import { homePaths } from '@/features/home';
import { islandsPaths } from '@/features/islands';
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
  const islands = useIslands();
  const mapIslands = useMemo(
    () =>
      (islands ?? [])
        .filter((island) => island.status !== 'drifted')
        .map((island) => toMapIsland(island, 0)),
    [islands],
  );

  return (
    <div className={styles.map}>
      <WorldCanvas
        islands={mapIslands}
        onIslandSelect={(id) => void navigate(islandsPaths.detail(id))}
        onHomeSelect={() => void navigate(homePaths.root)}
      />
      {islands?.length === 0 && (
        <div className={styles.overlay}>
          <Notice {...mapTexts.noIslands} />
        </div>
      )}
    </div>
  );
}

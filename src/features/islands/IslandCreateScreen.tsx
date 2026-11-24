import { useNavigate } from 'react-router';
import { createIsland } from '@/actions/islands/manageIslands';
import { islandTexts } from '@/content/texts/islands';
import { navigationTexts } from '@/content/texts/navigation';
import { mapPaths } from '@/features/map';
import { Screen } from '@/ui/Screen';
import { ScreenHeader } from '@/ui/ScreenHeader';
import { useGoBack } from '@/ui/useGoBack';
import { IslandForm } from './components/IslandForm';
import { islandsPaths } from './paths';
import styles from './IslandCreateScreen.module.css';

/** Een nieuw eiland (doel) maken. Daarna ga je meteen naar het eiland om je eerste stap te plannen. */
export function IslandCreateScreen() {
  const navigate = useNavigate();
  const goBack = useGoBack(mapPaths.root);

  return (
    <Screen>
      <ScreenHeader
        title={islandTexts.create.title}
        onBack={goBack}
        backLabel={navigationTexts.back}
      />
      <p className={styles.intro}>{islandTexts.create.intro}</p>
      <IslandForm
        onSubmit={async (input) => {
          const result = await createIsland(input);
          if (!result.ok) return result.error;
          void navigate(islandsPaths.detail(result.island.id), { replace: true });
          return null;
        }}
      />
    </Screen>
  );
}

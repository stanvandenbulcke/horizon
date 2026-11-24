import { useParams } from 'react-router';
import { islandTexts } from '@/content/texts/islands';
import { navigationTexts } from '@/content/texts/navigation';
import { useIsland } from '@/data/hooks/useIslands';
import { mapPaths } from '@/features/map';
import { Notice } from '@/ui/Notice';
import { Screen } from '@/ui/Screen';
import { ScreenHeader } from '@/ui/ScreenHeader';
import { useGoBack } from '@/ui/useGoBack';

/** Het scherm van één eiland. In M3 komen hier de bezienswaardigheden en stappen. */
export function IslandScreen() {
  const { islandId } = useParams();
  const island = useIsland(islandId);
  const goBack = useGoBack(mapPaths.root);

  return (
    <Screen tone="sky">
      <ScreenHeader
        title={island ? `${island.emoji} ${island.name}` : ''}
        onBack={goBack}
        backLabel={navigationTexts.back}
      />
      {island === null && <Notice {...islandTexts.notFound} />}
    </Screen>
  );
}

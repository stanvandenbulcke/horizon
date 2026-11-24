import { navigationTexts } from '@/content/texts/navigation';
import { placeholderTexts } from '@/content/texts/placeholders';
import { Notice } from '@/ui/Notice';
import { Screen } from '@/ui/Screen';
import { ScreenHeader } from '@/ui/ScreenHeader';

/** 🗺️ Kaart: je levenskaart. In M2 komt hier de 3D-wereld. */
export function MapScreen() {
  return (
    <Screen tone="sky" withTabBar>
      <ScreenHeader title={navigationTexts.tabs.map} />
      <Notice {...placeholderTexts.map} />
    </Screen>
  );
}

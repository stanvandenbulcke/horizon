import { navigationTexts } from '@/content/texts/navigation';
import { placeholderTexts } from '@/content/texts/placeholders';
import { Notice } from '@/ui/Notice';
import { Screen } from '@/ui/Screen';
import { ScreenHeader } from '@/ui/ScreenHeader';

/** 📖 Logboek: jaarboek, verzamelboek en vuurtoren. Komt in fase 1b. */
export function LogbookScreen() {
  return (
    <Screen withTabBar>
      <ScreenHeader title={navigationTexts.tabs.logbook} />
      <Notice {...placeholderTexts.logbook} />
    </Screen>
  );
}

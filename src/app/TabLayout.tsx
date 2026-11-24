import { Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { navigationTexts } from '@/content/texts/navigation';
import { settingsPaths } from '@/features/settings';
import { IconButton } from '@/ui/IconButton';
import { TabBar } from './TabBar';
import styles from './TabLayout.module.css';

/** De schermen met tabs onderaan, en het tandwiel rechtsboven. */
export function TabLayout() {
  const navigate = useNavigate();
  return (
    <div className={styles.layout}>
      {/* Zolang een scherm nog laadt (zoals de 3D-kaart), toon je even niets */}
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <div className={styles.settings}>
        <IconButton
          label={navigationTexts.openSettings}
          onClick={() => void navigate(settingsPaths.root)}
        >
          ⚙️
        </IconButton>
      </div>
      <TabBar />
    </div>
  );
}

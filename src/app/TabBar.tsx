import { NavLink } from 'react-router';
import { navigationTexts } from '@/content/texts/navigation';
import { homePaths } from '@/features/home';
import { logbookPaths } from '@/features/logbook';
import { mapPaths } from '@/features/map';
import { cx } from '@/lib/classNames';
import styles from './TabBar.module.css';

const tabs = [
  { path: mapPaths.root, icon: '🗺️', label: navigationTexts.tabs.map },
  { path: homePaths.root, icon: '🏝️', label: navigationTexts.tabs.home },
  { path: logbookPaths.root, icon: '📖', label: navigationTexts.tabs.logbook },
];

/** De 3 tabs onderaan: Kaart, Thuis en Logboek. Nooit meer dan 3. */
export function TabBar() {
  return (
    <nav className={styles.bar} aria-label={navigationTexts.tabBar}>
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end
          className={({ isActive }) => cx(styles.tab, isActive && styles.active)}
        >
          <span className={styles.icon} aria-hidden="true">
            {tab.icon}
          </span>
          <span className={styles.label}>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

import type { ReactNode } from 'react';
import { cx } from '@/lib/classNames';
import styles from './Screen.module.css';

interface ScreenProps {
  children?: ReactNode;
  /** sky = lucht (speelse schermen), paper = rustig (instellingen, formulieren) */
  tone?: 'sky' | 'paper';
  /** Laat onderaan plaats voor de tabs */
  withTabBar?: boolean;
}

/** Een volledig scherm dat kan scrollen, met ruimte voor de notch en de balk onderaan. */
export function Screen({ children, tone = 'paper', withTabBar = false }: ScreenProps) {
  return (
    <main className={cx(styles.screen, styles[tone], withTabBar && styles.withTabBar)}>
      <div className={styles.content}>{children}</div>
    </main>
  );
}

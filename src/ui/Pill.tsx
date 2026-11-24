import type { ReactNode } from 'react';
import styles from './Pill.module.css';

interface PillProps {
  icon: ReactNode;
  /** Beschrijving voor schermlezers, bv. "23 schelpen gespaard" */
  label: string;
  children: ReactNode;
}

/** Een afgerond labeltje met icoon en getal, zoals de schelpenteller. */
export function Pill({ icon, label, children }: PillProps) {
  return (
    <div className={styles.pill} role="status" aria-label={label}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.value} aria-hidden="true">
        {children}
      </span>
    </div>
  );
}

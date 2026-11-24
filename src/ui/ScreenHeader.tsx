import type { ReactNode } from 'react';
import { IconButton } from './IconButton';
import styles from './ScreenHeader.module.css';

interface ScreenHeaderProps {
  title: string;
  /** Als je dit invult, verschijnt er een terugknop */
  onBack?: () => void;
  /** Tekst voor schermlezers op de terugknop */
  backLabel?: string;
  /** Iets extra rechts, bv. een knop */
  action?: ReactNode;
}

/** De titelbalk bovenaan een scherm, met een terugknop. */
export function ScreenHeader({ title, onBack, backLabel = '', action }: ScreenHeaderProps) {
  return (
    <header className={styles.header}>
      {onBack ? (
        <IconButton label={backLabel} onClick={onBack}>
          ←
        </IconButton>
      ) : (
        <span className={styles.spacer} />
      )}
      <h1 className={styles.title}>{title}</h1>
      {action ?? <span className={styles.spacer} />}
    </header>
  );
}

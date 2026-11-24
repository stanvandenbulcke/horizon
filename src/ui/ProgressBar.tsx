import { cx } from '@/lib/classNames';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  /** Van 0 (leeg) tot 1 (vol) */
  value: number;
  /** Beschrijving voor schermlezers, bv. "40% verkend" */
  label: string;
  complete?: boolean;
}

/** Een dikke balk die zich vult, in Clash-stijl. */
export function ProgressBar({ value, label, complete = false }: ProgressBarProps) {
  const percent = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div
      className={styles.bar}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
    >
      <div
        className={cx(styles.fill, complete && styles.complete)}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

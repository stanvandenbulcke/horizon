import type { ReactNode } from 'react';
import { cx } from '@/lib/classNames';
import styles from './ProgressRing.module.css';

interface ProgressRingProps {
  /** Van 0 (leeg) tot 1 (vol) */
  value: number;
  /** Beschrijving voor schermlezers, bv. "3 van 5 schelpen verdiend" */
  label: string;
  /** Groen als het doel gehaald is */
  complete?: boolean;
  size?: number;
  thickness?: number;
  /** Wat er in het midden van de ring staat */
  children?: ReactNode;
}

/** Een ring die zich vult, zoals de ring van je dagdoel. */
export function ProgressRing({
  value,
  label,
  complete = false,
  size = 168,
  thickness = 18,
  children,
}: ProgressRingProps) {
  const fraction = Math.min(1, Math.max(0, value));
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={styles.ring}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(fraction * 100)}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          className={styles.track}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
        />
        <circle
          className={cx(styles.fill, complete && styles.complete)}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - fraction)}
        />
      </svg>
      <div className={styles.center}>{children}</div>
    </div>
  );
}

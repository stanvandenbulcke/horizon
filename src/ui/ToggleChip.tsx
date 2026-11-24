import type { ReactNode } from 'react';
import { cx } from '@/lib/classNames';
import styles from './ToggleChip.module.css';

interface ToggleChipProps {
  pressed: boolean;
  onToggle: () => void;
  children: ReactNode;
  /** Beschrijving voor schermlezers, als de zichtbare tekst niet duidelijk genoeg is */
  label?: string;
  size?: 'normal' | 'large';
}

/** Een knopje dat aan of uit staat, zoals een dag van de week of een icoon. */
export function ToggleChip({
  pressed,
  onToggle,
  children,
  label,
  size = 'normal',
}: ToggleChipProps) {
  return (
    <button
      type="button"
      className={cx(styles.chip, styles[size], pressed && styles.pressed)}
      aria-pressed={pressed}
      aria-label={label}
      onClick={onToggle}
    >
      {children}
    </button>
  );
}

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/classNames';
import styles from './IconButton.module.css';

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Wat de knop doet, voor schermlezers (verplicht, want er staat geen tekst op). */
  label: string;
  /** Het icoon, bv. een emoji */
  children: ReactNode;
  size?: 'normal' | 'small';
}

/** Ronde knop met alleen een icoon, zoals het tandwiel of het terugpijltje. */
export function IconButton({
  label,
  children,
  size = 'normal',
  className,
  type = 'button',
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cx(styles.button, styles[size], className)}
      {...rest}
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}

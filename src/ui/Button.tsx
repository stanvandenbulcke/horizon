import type { ButtonHTMLAttributes } from 'react';
import { cx } from '@/lib/classNames';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = geel (de hoofdactie), secondary = wit, danger = rood (verwijderen) */
  variant?: ButtonVariant;
  /** Zo breed als de kolom */
  fullWidth?: boolean;
}

/** Grote, ronde knop met een 3D-randje, die inzakt als je erop tikt. */
export function Button({
  variant = 'primary',
  fullWidth = false,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(styles.button, styles[variant], fullWidth && styles.fullWidth, className)}
      {...rest}
    />
  );
}

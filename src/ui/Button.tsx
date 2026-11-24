import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

/** Grote, ronde knop met een 3D-randje, die inzakt als je erop tikt. */
export function Button({ className, type = 'button', ...rest }: ButtonProps) {
  const classes = className ? `${styles.button} ${className}` : styles.button;
  return <button type={type} className={classes} {...rest} />;
}

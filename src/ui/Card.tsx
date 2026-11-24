import type { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  title?: string;
  /** Korte uitleg onder de titel */
  hint?: string;
  children?: ReactNode;
}

/** Een wit kaartje met dikke rand, om dingen die bij elkaar horen te groeperen. */
export function Card({ title, hint, children }: CardProps) {
  return (
    <section className={styles.card}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {hint && <p className={styles.hint}>{hint}</p>}
      {children}
    </section>
  );
}

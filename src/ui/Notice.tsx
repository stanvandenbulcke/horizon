import type { ReactNode } from 'react';
import styles from './Notice.module.css';

interface NoticeProps {
  icon: string;
  title: string;
  text: string;
  /** Bv. een knop onder de tekst */
  children?: ReactNode;
}

/** Een vriendelijke melding met groot icoon, bv. als er nog niets te zien is. */
export function Notice({ icon, title, text, children }: NoticeProps) {
  return (
    <div className={styles.notice}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
      {children}
    </div>
  );
}

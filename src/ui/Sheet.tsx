import { type ReactNode, useEffect, useId, useRef } from 'react';
import { IconButton } from './IconButton';
import styles from './Sheet.module.css';

interface SheetProps {
  open: boolean;
  title: string;
  /** Tekst voor schermlezers op het sluitknopje */
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Een paneel dat van onderaan het scherm opschuift, bv. om een stap aan te passen.
 * Gebouwd op de ingebouwde <dialog> van de browser: die regelt focus en de Escape-toets.
 * Tik naast het paneel om het te sluiten.
 */
export function Sheet({ open, title, closeLabel, onClose, children }: SheetProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      className={styles.sheet}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        // Een tik op de donkere achtergrond (de dialog zelf, niet het paneel) sluit
        if (event.target === dialog.current) onClose();
      }}
    >
      <div className={styles.panel}>
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <IconButton size="small" label={closeLabel} onClick={onClose}>
            ✕
          </IconButton>
        </header>
        {open && children}
      </div>
    </dialog>
  );
}

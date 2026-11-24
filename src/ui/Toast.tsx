import styles from './Toast.module.css';

interface ToastProps {
  /** Het bericht, of null als er niets te tonen is */
  message: string | null;
}

/** Een berichtje dat bovenaan het scherm verschijnt, bv. "Land in zicht!". */
export function Toast({ message }: ToastProps) {
  return (
    <div className={styles.anchor} role="status" aria-live="polite">
      {message && (
        <div key={message} className={styles.toast}>
          {message}
        </div>
      )}
    </div>
  );
}

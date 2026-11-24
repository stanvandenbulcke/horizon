import { useId } from 'react';
import { cx } from '@/lib/classNames';
import styles from './TextField.module.css';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Wordt aangeroepen als je het veld verlaat (bv. om op te slaan) */
  onBlur?: () => void;
  /** Wordt aangeroepen als je op Enter (of "Gereed") tikt */
  onEnter?: () => void;
  placeholder?: string;
  maxLength?: number;
  /** "decimal" toont een cijfertoetsenbord op je iPhone */
  inputMode?: 'text' | 'decimal';
  /** Verberg het label (het blijft wel bestaan voor schermlezers) */
  hideLabel?: boolean;
}

/** Een tekstveld met een label erboven. */
export function TextField({
  label,
  value,
  onChange,
  onBlur,
  onEnter,
  placeholder,
  maxLength,
  inputMode = 'text',
  hideLabel = false,
}: TextFieldProps) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label className={cx(styles.label, hideLabel && styles.hidden)} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={styles.input}
        type="text"
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && onEnter) {
            event.preventDefault();
            onEnter();
          }
        }}
        autoComplete="off"
        enterKeyHint={onEnter ? 'send' : 'done'}
      />
    </div>
  );
}

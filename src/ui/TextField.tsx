import { useId } from 'react';
import styles from './TextField.module.css';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Wordt aangeroepen als je het veld verlaat (bv. om op te slaan) */
  onBlur?: () => void;
  placeholder?: string;
  maxLength?: number;
}

/** Een tekstveld met een label erboven. */
export function TextField({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  maxLength,
}: TextFieldProps) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={styles.input}
        type="text"
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        autoComplete="off"
        enterKeyHint="done"
      />
    </div>
  );
}

import { cx } from '@/lib/classNames';
import styles from './ColorPicker.module.css';

interface ColorPickerProps {
  /** De kleuren, elk met een naam voor schermlezers */
  options: ReadonlyArray<{ value: string; name: string }>;
  value: string;
  onChange: (color: string) => void;
}

/** Ronde kleurstaaltjes; je kiest er één. */
export function ColorPicker({ options, value, onChange }: ColorPickerProps) {
  return (
    <div className={styles.row}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cx(styles.swatch, option.value === value && styles.selected)}
          style={{ background: option.value }}
          aria-label={option.name}
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
        />
      ))}
    </div>
  );
}

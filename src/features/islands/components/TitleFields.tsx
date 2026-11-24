import { config } from '@/game/config';
import { IconButton } from '@/ui/IconButton';
import { TextField } from '@/ui/TextField';
import styles from './TitleFields.module.css';

interface TitleFieldsProps {
  titles: readonly string[];
  onChange: (titles: string[]) => void;
  /** Hoeveel velden er maximaal mogen zijn */
  max: number;
  placeholder: (index: number) => string;
  addLabel: string;
  removeLabel: (index: number) => string;
}

/** Een lijstje genummerde invulvelden, met toevoegen en weghalen (bezienswaardigheden, stappen). */
export function TitleFields({
  titles,
  onChange,
  max,
  placeholder,
  addLabel,
  removeLabel,
}: TitleFieldsProps) {
  const update = (index: number, value: string) =>
    onChange(titles.map((title, i) => (i === index ? value : title)));
  const remove = (index: number) => onChange(titles.filter((_, i) => i !== index));

  return (
    <div className={styles.fields}>
      {titles.map((title, index) => (
        <div key={index} className={styles.row}>
          <span className={styles.number} aria-hidden="true">
            {index + 1}
          </span>
          <div className={styles.input}>
            <TextField
              label={placeholder(index)}
              hideLabel
              value={title}
              onChange={(value) => update(index, value)}
              placeholder={placeholder(index)}
              maxLength={config.islands.maxStepLength}
            />
          </div>
          {titles.length > 1 && (
            <IconButton size="small" label={removeLabel(index)} onClick={() => remove(index)}>
              ✕
            </IconButton>
          )}
        </div>
      ))}
      {titles.length < max && (
        <button type="button" className={styles.add} onClick={() => onChange([...titles, ''])}>
          {addLabel}
        </button>
      )}
    </div>
  );
}

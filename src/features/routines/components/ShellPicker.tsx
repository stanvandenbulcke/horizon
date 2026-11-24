import { routineTexts } from '@/content/texts/routines';
import { config } from '@/game/config';
import { ToggleChip } from '@/ui/ToggleChip';
import styles from './ShellPicker.module.css';

interface ShellPickerProps {
  value: number;
  onChange: (shells: number) => void;
}

const { minShells, maxShells } = config.routine;
const options = Array.from({ length: maxShells - minShells + 1 }, (_, i) => minShells + i);

/** Kies hoeveel schelpen een routine oplevert (1 tot 3). */
export function ShellPicker({ value, onChange }: ShellPickerProps) {
  return (
    <div className={styles.row}>
      {options.map((count) => (
        <ToggleChip key={count} pressed={count === value} onToggle={() => onChange(count)}>
          {routineTexts.shellsOption(count)}
        </ToggleChip>
      ))}
    </div>
  );
}

import { routineTexts } from '@/content/texts/routines';
import { ALL_WEEKDAYS, type IsoWeekday } from '@/game/model';
import { ToggleChip } from '@/ui/ToggleChip';
import styles from './WeekdayPicker.module.css';

interface WeekdayPickerProps {
  value: readonly IsoWeekday[];
  onChange: (weekdays: IsoWeekday[]) => void;
}

/** Kies op welke dagen van de week een routine gepland staat. */
export function WeekdayPicker({ value, onChange }: WeekdayPickerProps) {
  const selected = new Set(value);
  const everyDay = selected.size === ALL_WEEKDAYS.length;

  const toggle = (day: IsoWeekday) => {
    onChange(ALL_WEEKDAYS.filter((d) => (d === day ? !selected.has(d) : selected.has(d))));
  };

  return (
    <div className={styles.picker}>
      <div className={styles.days}>
        {ALL_WEEKDAYS.map((day) => (
          <ToggleChip
            key={day}
            pressed={selected.has(day)}
            onToggle={() => toggle(day)}
            label={routineTexts.weekdayLong(day)}
          >
            {routineTexts.weekdayShort(day)}
          </ToggleChip>
        ))}
      </div>
      <ToggleChip pressed={everyDay} onToggle={() => onChange(everyDay ? [] : [...ALL_WEEKDAYS])}>
        {routineTexts.everyDay}
      </ToggleChip>
    </div>
  );
}

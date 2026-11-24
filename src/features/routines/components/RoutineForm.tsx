import { type FormEvent, useState } from 'react';
import { routineTexts } from '@/content/texts/routines';
import { config } from '@/game/config';
import type { RoutineInput, RoutineInputError } from '@/game/routines/routine';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';
import { TextField } from '@/ui/TextField';
import { EmojiPicker } from './EmojiPicker';
import { ShellPicker } from './ShellPicker';
import { WeekdayPicker } from './WeekdayPicker';
import styles from './RoutineForm.module.css';

interface RoutineFormProps {
  initial: RoutineInput;
  /** Slaat op en geeft een fout terug als er iets niet klopt (of null als het lukte). */
  onSubmit: (input: RoutineInput) => Promise<RoutineInputError | null>;
}

/** Het formulier om een routine te maken of aan te passen. */
export function RoutineForm({ initial, onSubmit }: RoutineFormProps) {
  const [name, setName] = useState(initial.name);
  const [emoji, setEmoji] = useState(initial.emoji);
  const [shells, setShells] = useState(initial.shells);
  const [weekdays, setWeekdays] = useState(initial.weekdays);
  const [error, setError] = useState<RoutineInputError | null>(null);

  // Zodra je iets aanpast, verdwijnt een oude foutmelding
  const edit =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setError(null);
    };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(await onSubmit({ name, emoji, shells, weekdays }));
  };

  return (
    <form className={styles.form} onSubmit={(event) => void submit(event)}>
      <Card>
        <TextField
          label={routineTexts.nameLabel}
          value={name}
          onChange={edit(setName)}
          placeholder={routineTexts.namePlaceholder}
          maxLength={config.routine.maxNameLength}
        />
      </Card>

      <Card title={routineTexts.emojiLabel}>
        <EmojiPicker value={emoji} onChange={edit(setEmoji)} />
      </Card>

      <Card title={routineTexts.shellsLabel} hint={routineTexts.shellsHint}>
        <ShellPicker value={shells} onChange={edit(setShells)} />
      </Card>

      <Card title={routineTexts.weekdaysLabel}>
        <WeekdayPicker value={weekdays} onChange={edit(setWeekdays)} />
      </Card>

      {error && (
        <p className={styles.error} role="alert">
          {routineTexts.errors[error]}
        </p>
      )}

      <Button type="submit" fullWidth>
        {routineTexts.save}
      </Button>
    </form>
  );
}

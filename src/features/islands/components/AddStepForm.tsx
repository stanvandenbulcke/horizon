import { useState } from 'react';
import { config } from '@/game/config';
import { Button } from '@/ui/Button';
import { TextField } from '@/ui/TextField';
import styles from './AddStepForm.module.css';

interface AddStepFormProps {
  placeholder: string;
  buttonLabel: string;
  onAdd: (title: string) => void;
}

/** Een veldje + knop om snel iets toe te voegen (een stap, een bezienswaardigheid). */
export function AddStepForm({ placeholder, buttonLabel, onAdd }: AddStepFormProps) {
  const [title, setTitle] = useState('');

  const add = () => {
    if (title.trim() === '') return;
    onAdd(title);
    setTitle('');
  };

  return (
    <div className={styles.form}>
      <div className={styles.field}>
        <TextField
          label={placeholder}
          hideLabel
          value={title}
          onChange={setTitle}
          onEnter={add}
          placeholder={placeholder}
          maxLength={config.islands.maxStepLength}
        />
      </div>
      <Button variant="secondary" onClick={add} disabled={title.trim() === ''}>
        {buttonLabel}
      </Button>
    </div>
  );
}

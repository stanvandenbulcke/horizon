import { useState } from 'react';
import { deleteStep, moveStep, renameStep } from '@/actions/islands/steps';
import { islandTexts } from '@/content/texts/islands';
import { config } from '@/game/config';
import type { Step } from '@/game/model';
import { Button } from '@/ui/Button';
import { TextField } from '@/ui/TextField';
import styles from './StepEditor.module.css';

interface StepEditorProps {
  step: Step;
  /** Wordt aangeroepen als je klaar bent (na opslaan of verwijderen) */
  onDone: () => void;
}

const texts = islandTexts.steps;

/** Een stap hernoemen, verschuiven of verwijderen. */
export function StepEditor({ step, onDone }: StepEditorProps) {
  const [title, setTitle] = useState(step.title);

  const save = async () => {
    await renameStep(step.id, title);
    onDone();
  };

  const remove = async () => {
    await deleteStep(step.id);
    onDone();
  };

  return (
    <div className={styles.editor}>
      <TextField
        label={texts.nameLabel}
        value={title}
        onChange={setTitle}
        onEnter={() => void save()}
        maxLength={config.islands.maxStepLength}
      />
      <Button fullWidth onClick={() => void save()}>
        {texts.save}
      </Button>
      <div className={styles.row}>
        <Button variant="secondary" onClick={() => void moveStep(step.id, -1)}>
          ↑ {texts.moveUp}
        </Button>
        <Button variant="secondary" onClick={() => void moveStep(step.id, 1)}>
          ↓ {texts.moveDown}
        </Button>
      </div>
      <Button variant="danger" fullWidth onClick={() => void remove()}>
        {texts.delete}
      </Button>
    </div>
  );
}

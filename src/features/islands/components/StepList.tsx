import { islandTexts } from '@/content/texts/islands';
import type { Step } from '@/game/model';
import { cx } from '@/lib/classNames';
import { IconButton } from '@/ui/IconButton';
import styles from './StepList.module.css';

interface StepListProps {
  steps: readonly Step[];
  onToggle: (step: Step) => void;
  onEdit: (step: Step) => void;
}

const texts = islandTexts.steps;

/** Een lijst stappen om af te vinken. Een tik op het bolletje = gedaan (of weer niet). */
export function StepList({ steps, onToggle, onEdit }: StepListProps) {
  if (steps.length === 0) return null;
  return (
    <ul className={styles.list}>
      {steps.map((step) => {
        const done = step.doneAt !== null;
        return (
          <li key={step.id} className={cx(styles.row, done && styles.done)}>
            <button
              type="button"
              className={styles.toggle}
              aria-pressed={done}
              aria-label={texts.toggleLabel(step.title)}
              onClick={() => onToggle(step)}
            >
              <span className={styles.check} aria-hidden="true">
                {done ? '✓' : ''}
              </span>
              <span className={styles.title}>{step.title}</span>
            </button>
            <IconButton size="small" label={texts.edit(step.title)} onClick={() => onEdit(step)}>
              ✏️
            </IconButton>
          </li>
        );
      })}
    </ul>
  );
}

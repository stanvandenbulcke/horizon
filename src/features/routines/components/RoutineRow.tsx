import { routineTexts } from '@/content/texts/routines';
import type { Routine } from '@/game/model';
import { cx } from '@/lib/classNames';
import { IconButton } from '@/ui/IconButton';
import styles from './RoutineRow.module.css';

interface RoutineRowProps {
  routine: Routine;
  isFirst: boolean;
  isLast: boolean;
  onOpen: () => void;
  onMove: (direction: -1 | 1) => void;
}

/** Eén routine in de beheerlijst, met pijltjes om de volgorde te veranderen. */
export function RoutineRow({ routine, isFirst, isLast, onOpen, onMove }: RoutineRowProps) {
  return (
    <div className={cx(styles.row, !routine.active && styles.paused)}>
      <button type="button" className={styles.main} onClick={onOpen}>
        <span className={styles.emoji} aria-hidden="true">
          {routine.emoji}
        </span>
        <span className={styles.text}>
          <span className={styles.name}>{routine.name}</span>
          <span className={styles.summary}>
            {routineTexts.summary(routine.weekdays, routine.shells)}
            {!routine.active && ` · ${routineTexts.paused}`}
          </span>
        </span>
      </button>
      <div className={styles.move}>
        <IconButton
          size="small"
          label={routineTexts.moveUp(routine.name)}
          disabled={isFirst}
          onClick={() => onMove(-1)}
        >
          ↑
        </IconButton>
        <IconButton
          size="small"
          label={routineTexts.moveDown(routine.name)}
          disabled={isLast}
          onClick={() => onMove(1)}
        >
          ↓
        </IconButton>
      </div>
    </div>
  );
}

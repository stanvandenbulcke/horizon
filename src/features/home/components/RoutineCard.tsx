import { homeTexts } from '@/content/texts/home';
import type { Routine } from '@/game/model';
import { cx } from '@/lib/classNames';
import styles from './RoutineCard.module.css';

interface RoutineCardProps {
  routine: Routine;
  done: boolean;
  onToggle: () => void;
}

/** Eén routine op het thuisscherm. Eén tik = afgevinkt, nog een tik = ongedaan. */
export function RoutineCard({ routine, done, onToggle }: RoutineCardProps) {
  return (
    <button
      type="button"
      className={cx(styles.card, done && styles.done)}
      aria-pressed={done}
      aria-label={homeTexts.routineLabel(routine.name, routine.shells)}
      onClick={onToggle}
    >
      <span className={styles.emoji} aria-hidden="true">
        {routine.emoji}
        <span className={styles.check}>✓</span>
      </span>
      <span className={styles.name}>{routine.name}</span>
      <span className={styles.shells} aria-hidden="true">
        {homeTexts.routineShells(routine.shells)} 🐚
      </span>
    </button>
  );
}

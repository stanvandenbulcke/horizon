import { homeTexts } from '@/content/texts/home';
import type { GameDay } from '@/game/model';
import type { GoalProgress } from '@/game/shells/shells';
import { pickBySeed } from '@/lib/random';
import { ProgressRing } from '@/ui/ProgressRing';
import styles from './DailyGoal.module.css';

interface DailyGoalProps {
  progress: GoalProgress;
  day: GameDay;
}

/** De ring van je dagdoel, met hoeveel schelpen je nog nodig hebt. */
export function DailyGoal({ progress, day }: DailyGoalProps) {
  return (
    <div className={styles.goal}>
      <ProgressRing
        value={progress.fraction}
        complete={progress.reached}
        label={homeTexts.dailyGoalProgress(progress.earned, progress.goal)}
      >
        <span className={styles.label}>{homeTexts.dailyGoal}</span>
        <span className={styles.count}>
          {progress.earned}
          <span className={styles.goalNumber}>/{progress.goal}</span>
        </span>
        <span className={styles.shell} aria-hidden="true">
          🐚
        </span>
      </ProgressRing>
      <p className={styles.message} aria-live="polite">
        {progress.reached
          ? pickBySeed(homeTexts.goalReached, day)
          : homeTexts.goalRemaining(progress.remaining)}
      </p>
    </div>
  );
}

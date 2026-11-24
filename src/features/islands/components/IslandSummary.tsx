import { islandTexts } from '@/content/texts/islands';
import type { Island } from '@/game/model';
import { ProgressBar } from '@/ui/ProgressBar';
import styles from './IslandSummary.module.css';

interface IslandSummaryProps {
  island: Island;
  progress: number;
  /** Een korte regel uitleg onder de balk, bv. "2 van 4 bezienswaardigheden bereikt" */
  detail: string;
}

/** Bovenaan een eiland: hoe ver je al bent, met een balk die zich vult. */
export function IslandSummary({ island, progress, detail }: IslandSummaryProps) {
  const completed = island.status === 'completed';
  const percent = Math.round(progress * 100);
  return (
    <section className={styles.summary}>
      <div className={styles.badges}>
        {island.parentIslandId !== null && (
          <span className={styles.badge}>{islandTexts.sideQuestBadge}</span>
        )}
        {completed && <span className={styles.completed}>{islandTexts.completedBadge}</span>}
      </div>
      <ProgressBar
        value={progress}
        complete={completed}
        label={islandTexts.progressLabel(percent)}
      />
      <p className={styles.detail}>
        <strong>{islandTexts.progressLabel(percent)}</strong> · {detail}
      </p>
    </section>
  );
}

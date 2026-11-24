import { useNavigate } from 'react-router';
import { islandTexts } from '@/content/texts/islands';
import type { IslandWithProgress } from '@/data/hooks/useIslands';
import { islandsPaths } from '@/features/islands/paths';
import type { Id } from '@/game/model';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';
import { ProgressBar } from '@/ui/ProgressBar';
import styles from './SideQuestList.module.css';

interface SideQuestListProps {
  parentId: Id;
  sideQuests: readonly IslandWithProgress[];
}

const texts = islandTexts.sideQuests;

/** De side quests van een eiland, met een knop om er een te maken. */
export function SideQuestList({ parentId, sideQuests }: SideQuestListProps) {
  const navigate = useNavigate();
  return (
    <Card title={texts.title} hint={texts.hint}>
      {sideQuests.length > 0 && (
        <ul className={styles.list}>
          {sideQuests.map(({ island, progress }) => (
            <li key={island.id}>
              <button
                type="button"
                className={styles.quest}
                onClick={() => void navigate(islandsPaths.detail(island.id))}
              >
                <span className={styles.emoji} aria-hidden="true">
                  {island.status === 'completed' ? '🏆' : island.emoji}
                </span>
                <span className={styles.body}>
                  <span className={styles.name}>{island.name}</span>
                  <ProgressBar
                    value={progress}
                    complete={island.status === 'completed'}
                    label={islandTexts.progressLabel(Math.round(progress * 100))}
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <Button
        variant="secondary"
        fullWidth
        onClick={() => void navigate(islandsPaths.sideQuest(parentId))}
      >
        {texts.add}
      </Button>
    </Card>
  );
}

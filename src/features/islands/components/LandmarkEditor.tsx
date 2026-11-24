import { addLandmark } from '@/actions/islands/landmarks';
import { islandTexts } from '@/content/texts/islands';
import { liveLandmarks } from '@/game/islands/progress';
import type { Id, Landmark } from '@/game/model';
import { Card } from '@/ui/Card';
import { AddStepForm } from './AddStepForm';
import { LandmarkEditRow } from './LandmarkEditRow';
import styles from './LandmarkEditor.module.css';

interface LandmarkEditorProps {
  islandId: Id;
  landmarks: readonly Landmark[];
}

const texts = islandTexts.editScreen;

/** De bezienswaardigheden van een pad: hernoemen, verschuiven, verwijderen en toevoegen. */
export function LandmarkEditor({ islandId, landmarks }: LandmarkEditorProps) {
  const ordered = liveLandmarks(landmarks);
  return (
    <Card title={texts.landmarksTitle}>
      <ol className={styles.list}>
        {ordered.map((landmark, index) => (
          <li key={`${landmark.id}-${landmark.title}`}>
            <LandmarkEditRow
              landmark={landmark}
              isFirst={index === 0}
              isLast={index === ordered.length - 1}
              canDelete={ordered.length > 1}
            />
          </li>
        ))}
      </ol>
      <AddStepForm
        placeholder={texts.newLandmarkPlaceholder}
        buttonLabel={texts.add}
        onAdd={(title) => void addLandmark(islandId, title)}
      />
    </Card>
  );
}

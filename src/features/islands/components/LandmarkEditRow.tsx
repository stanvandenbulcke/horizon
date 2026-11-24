import { useState } from 'react';
import { deleteLandmark, moveLandmark, renameLandmark } from '@/actions/islands/landmarks';
import { islandTexts } from '@/content/texts/islands';
import { config } from '@/game/config';
import type { Landmark } from '@/game/model';
import { IconButton } from '@/ui/IconButton';
import { TextField } from '@/ui/TextField';
import styles from './LandmarkEditRow.module.css';

interface LandmarkEditRowProps {
  landmark: Landmark;
  isFirst: boolean;
  isLast: boolean;
  /** Het laatste overgebleven tussendoel kan je niet verwijderen */
  canDelete: boolean;
}

const texts = islandTexts.editScreen;

/** Eén bezienswaardigheid in de bewerklijst. De naam wordt bewaard zodra je het veld verlaat. */
export function LandmarkEditRow({ landmark, isFirst, isLast, canDelete }: LandmarkEditRowProps) {
  const [title, setTitle] = useState(landmark.title);
  const save = () => {
    if (title.trim() === '') setTitle(landmark.title);
    else if (title !== landmark.title) void renameLandmark(landmark.id, title);
  };

  return (
    <div className={styles.row}>
      <span className={styles.marker} aria-hidden="true">
        {landmark.completedAt ? '✓' : '🚩'}
      </span>
      <div className={styles.field}>
        <TextField
          label={texts.renameLandmark}
          hideLabel
          value={title}
          onChange={setTitle}
          onBlur={save}
          maxLength={config.islands.maxStepLength}
        />
      </div>
      <IconButton
        size="small"
        label={texts.moveUp(landmark.title)}
        disabled={isFirst}
        onClick={() => void moveLandmark(landmark.id, -1)}
      >
        ↑
      </IconButton>
      <IconButton
        size="small"
        label={texts.moveDown(landmark.title)}
        disabled={isLast}
        onClick={() => void moveLandmark(landmark.id, 1)}
      >
        ↓
      </IconButton>
      <IconButton
        size="small"
        label={texts.deleteLandmark(landmark.title)}
        disabled={!canDelete}
        onClick={() => void deleteLandmark(landmark.id)}
      >
        ✕
      </IconButton>
    </div>
  );
}

import { reachLandmark, reopenLandmark } from '@/actions/islands/landmarks';
import { islandTexts } from '@/content/texts/islands';
import { currentLandmark, liveLandmarks, stepsFor } from '@/game/islands/progress';
import type { Landmark, Step } from '@/game/model';
import { IconButton } from '@/ui/IconButton';
import { CurrentLandmark } from './CurrentLandmark';
import styles from './PathTrail.module.css';

interface PathTrailProps {
  landmarks: readonly Landmark[];
  steps: readonly Step[];
  onEditStep: (step: Step) => void;
  /** Wordt aangeroepen als je een bezienswaardigheid bereikt (voor een feestje) */
  onReached: (islandCompleted: boolean) => void;
}

const texts = islandTexts.path;

/**
 * Het pad naar de vuurtoren: bereikte bezienswaardigheden, de huidige (met stappen),
 * en wat nog in de mist ligt.
 */
export function PathTrail({ landmarks, steps, onEditStep, onReached }: PathTrailProps) {
  const ordered = liveLandmarks(landmarks);
  const current = currentLandmark(ordered);
  const reachedCount = ordered.filter((landmark) => landmark.completedAt !== null).length;

  const reach = async (landmark: Landmark) => {
    const result = await reachLandmark(landmark.id);
    onReached(result.islandCompleted);
  };

  return (
    <ol className={styles.trail}>
      {ordered.map((landmark) => {
        if (landmark.completedAt !== null) {
          return (
            <li key={landmark.id} className={styles.reached}>
              <span className={styles.marker} aria-hidden="true">
                ✓
              </span>
              <span className={styles.name}>{landmark.title}</span>
              <IconButton
                size="small"
                label={texts.reopen(landmark.title)}
                onClick={() => void reopenLandmark(landmark.id)}
              >
                ↩
              </IconButton>
            </li>
          );
        }
        if (landmark.id === current?.id) {
          return (
            <li key={landmark.id}>
              <CurrentLandmark
                landmark={landmark}
                steps={stepsFor(steps, landmark.id)}
                isFirst={reachedCount === 0}
                onReach={() => void reach(landmark)}
                onEditStep={onEditStep}
              />
            </li>
          );
        }
        return (
          <li key={landmark.id} className={styles.foggy}>
            <span className={styles.marker} aria-hidden="true">
              🌫️
            </span>
            <span className={styles.name}>{landmark.title}</span>
            <span className={styles.fogLabel}>{texts.inTheFog}</span>
          </li>
        );
      })}
    </ol>
  );
}

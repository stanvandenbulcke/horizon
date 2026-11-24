import { addStep, toggleStep } from '@/actions/islands/steps';
import { islandTexts } from '@/content/texts/islands';
import type { Landmark, Step } from '@/game/model';
import { Button } from '@/ui/Button';
import { AddStepForm } from './AddStepForm';
import { StepList } from './StepList';
import styles from './CurrentLandmark.module.css';

interface CurrentLandmarkProps {
  landmark: Landmark;
  steps: readonly Step[];
  /** true als dit de allereerste bezienswaardigheid is (nog niets bereikt) */
  isFirst: boolean;
  onReach: () => void;
  onEditStep: (step: Step) => void;
}

const texts = islandTexts.path;

/**
 * De bezienswaardigheid waar je nu naartoe werkt. Je plant alleen stappen voor deze:
 * wat verder ligt, zit nog in de mist.
 */
export function CurrentLandmark({
  landmark,
  steps,
  isFirst,
  onReach,
  onEditStep,
}: CurrentLandmarkProps) {
  const allDone = steps.length > 0 && steps.every((step) => step.doneAt !== null);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>
        <span aria-hidden="true">🚩</span> {landmark.title}
      </h3>

      {steps.length === 0 && (
        <p className={styles.prompt}>{isFirst ? texts.firstStepPrompt : texts.nextStepsPrompt}</p>
      )}

      <StepList steps={steps} onToggle={(step) => void toggleStep(step.id)} onEdit={onEditStep} />

      <AddStepForm
        placeholder={texts.stepPlaceholder}
        buttonLabel={texts.addStep}
        onAdd={(title) => void addStep(landmark.islandId, landmark.id, title)}
      />
      <p className={styles.hint}>{texts.planHint}</p>

      {allDone ? (
        <div className={styles.callout}>
          <p className={styles.question}>{texts.allDoneQuestion(landmark.title)}</p>
          <Button fullWidth onClick={onReach}>
            {texts.reach}
          </Button>
        </div>
      ) : (
        <Button variant="secondary" fullWidth onClick={onReach}>
          {texts.reach}
        </Button>
      )}
    </div>
  );
}

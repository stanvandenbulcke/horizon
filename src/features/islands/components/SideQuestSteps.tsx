import { addStep, toggleStep } from '@/actions/islands/steps';
import { islandTexts } from '@/content/texts/islands';
import { stepsFor } from '@/game/islands/progress';
import type { Island, Step } from '@/game/model';
import { Card } from '@/ui/Card';
import { AddStepForm } from './AddStepForm';
import { StepList } from './StepList';

interface SideQuestStepsProps {
  island: Island;
  steps: readonly Step[];
  onEditStep: (step: Step) => void;
  /** Wordt aangeroepen na het afvinken (voor een feestje als de quest af is) */
  onToggled: (islandCompleted: boolean) => void;
}

/** De stappen van een side quest. Alles afgevinkt = side quest af. */
export function SideQuestSteps({ island, steps, onEditStep, onToggled }: SideQuestStepsProps) {
  const toggle = async (step: Step) => {
    const result = await toggleStep(step.id);
    onToggled(result.islandCompleted);
  };

  return (
    <Card>
      <StepList
        steps={stepsFor(steps, null)}
        onToggle={(step) => void toggle(step)}
        onEdit={onEditStep}
      />
      <AddStepForm
        placeholder={islandTexts.path.stepPlaceholder}
        buttonLabel={islandTexts.path.addStep}
        onAdd={(title) => void addStep(island.id, null, title)}
      />
    </Card>
  );
}

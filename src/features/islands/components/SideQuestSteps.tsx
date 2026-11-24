import { addStep, toggleStep } from '@/actions/islands/steps';
import { celebrationTexts } from '@/content/texts/celebrations';
import { islandTexts } from '@/content/texts/islands';
import { celebrate } from '@/features/celebrations';
import { stepsFor } from '@/game/islands/progress';
import type { Island, Step } from '@/game/model';
import { pickRandom } from '@/lib/random';
import { Card } from '@/ui/Card';
import { AddStepForm } from './AddStepForm';
import { StepList } from './StepList';

interface SideQuestStepsProps {
  island: Island;
  steps: readonly Step[];
  onEditStep: (step: Step) => void;
}

/** De stappen van een side quest. Alles afgevinkt = side quest af (en dus vuurwerk). */
export function SideQuestSteps({ island, steps, onEditStep }: SideQuestStepsProps) {
  const toggle = async (step: Step, button: HTMLElement) => {
    const result = await toggleStep(step.id);
    if (result.islandCompleted) {
      celebrate('big', { message: pickRandom(celebrationTexts.island) });
    } else if (result.done) {
      celebrate('small', { from: button });
    }
  };

  return (
    <Card>
      <StepList
        steps={stepsFor(steps, null)}
        onToggle={(step, button) => void toggle(step, button)}
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

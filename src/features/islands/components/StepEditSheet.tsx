import { islandTexts } from '@/content/texts/islands';
import type { Step } from '@/game/model';
import { Sheet } from '@/ui/Sheet';
import { StepEditor } from './StepEditor';

interface StepEditSheetProps {
  /** De stap die je aanpast, of null als het paneel dicht is */
  step: Step | null;
  onClose: () => void;
}

/** Een paneel dat van onder opschuift om een stap aan te passen. */
export function StepEditSheet({ step, onClose }: StepEditSheetProps) {
  const texts = islandTexts.steps;
  return (
    <Sheet open={step !== null} title={texts.sheetTitle} closeLabel={texts.close} onClose={onClose}>
      {step && <StepEditor key={step.id} step={step} onDone={onClose} />}
    </Sheet>
  );
}

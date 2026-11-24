import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { celebrationTexts } from '@/content/texts/celebrations';
import { islandTexts } from '@/content/texts/islands';
import { navigationTexts } from '@/content/texts/navigation';
import { useIslandDetail } from '@/data/hooks/useIslands';
import { celebrate } from '@/features/celebrations';
import { mapPaths } from '@/features/map';
import { bridgeTotal, liveLandmarks, stepsFor } from '@/game/islands/progress';
import type { Step } from '@/game/model';
import { pickRandom } from '@/lib/random';
import { IconButton } from '@/ui/IconButton';
import { Notice } from '@/ui/Notice';
import { Screen } from '@/ui/Screen';
import { ScreenHeader } from '@/ui/ScreenHeader';
import { useGoBack } from '@/ui/useGoBack';
import { BridgePanel } from './components/BridgePanel';
import { IslandSummary } from './components/IslandSummary';
import { PathTrail } from './components/PathTrail';
import { SideQuestList } from './components/SideQuestList';
import { SideQuestSteps } from './components/SideQuestSteps';
import { StepEditSheet } from './components/StepEditSheet';
import { islandsPaths } from './paths';

/** Een eiland af = vuurwerk; een bezienswaardigheid of pijler = een flink feest. */
function celebrateProgress(islandCompleted: boolean, milestone: 'landmark' | 'pillar' | null) {
  if (islandCompleted) {
    celebrate('big', { message: pickRandom(celebrationTexts.island) });
  } else if (milestone) {
    celebrate('medium', { message: pickRandom(celebrationTexts[milestone]) });
  } else {
    celebrate('small');
  }
}

/** Het scherm van één eiland: hoe ver je staat, je stappen, en de side quests ernaast. */
export function IslandScreen() {
  const { islandId } = useParams();
  const navigate = useNavigate();
  const goBack = useGoBack(mapPaths.root);
  const detail = useIslandDetail(islandId);
  const [editingStep, setEditingStep] = useState<Step | null>(null);

  if (detail === undefined) return <Screen tone="sky" />;
  if (detail === null) {
    return (
      <Screen tone="sky">
        <ScreenHeader title="" onBack={goBack} backLabel={navigationTexts.back} />
        <Notice {...islandTexts.notFound} />
      </Screen>
    );
  }

  const { island, landmarks, steps, sideQuests, progress } = detail;
  const isSideQuest = island.parentIslandId !== null;
  const reached = liveLandmarks(landmarks).filter((l) => l.completedAt !== null).length;
  const summaryDetail =
    island.type === 'bridge'
      ? islandTexts.bridge.total(bridgeTotal(steps), island.targetAmount ?? 0, island.unit ?? '')
      : isSideQuest
        ? islandTexts.sideQuests.stepsLeft(
            stepsFor(steps, null).filter((s) => s.doneAt !== null).length,
            stepsFor(steps, null).length,
          )
        : islandTexts.path.landmarkCount(reached, liveLandmarks(landmarks).length);

  return (
    <Screen tone="sky">
      <ScreenHeader
        title={`${island.emoji} ${island.name}`}
        onBack={goBack}
        backLabel={navigationTexts.back}
        action={
          <IconButton
            label={islandTexts.edit}
            onClick={() => void navigate(islandsPaths.edit(island.id))}
          >
            ✏️
          </IconButton>
        }
      />
      <IslandSummary island={island} progress={progress} detail={summaryDetail} />

      {island.type === 'bridge' ? (
        <BridgePanel
          island={island}
          landmarks={landmarks}
          steps={steps}
          onLogged={(pillars, completed) =>
            celebrateProgress(completed, pillars > 0 ? 'pillar' : null)
          }
        />
      ) : isSideQuest ? (
        <SideQuestSteps island={island} steps={steps} onEditStep={setEditingStep} />
      ) : (
        <PathTrail
          landmarks={landmarks}
          steps={steps}
          onEditStep={setEditingStep}
          onReached={(completed) => celebrateProgress(completed, 'landmark')}
        />
      )}

      {!isSideQuest && <SideQuestList parentId={island.id} sideQuests={sideQuests} />}

      <StepEditSheet step={editingStep} onClose={() => setEditingStep(null)} />
    </Screen>
  );
}

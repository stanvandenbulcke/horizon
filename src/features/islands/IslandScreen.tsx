import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { islandTexts } from '@/content/texts/islands';
import { navigationTexts } from '@/content/texts/navigation';
import { useIslandDetail } from '@/data/hooks/useIslands';
import { mapPaths } from '@/features/map';
import { bridgeTotal, liveLandmarks, stepsFor } from '@/game/islands/progress';
import type { Step } from '@/game/model';
import { IconButton } from '@/ui/IconButton';
import { Notice } from '@/ui/Notice';
import { Screen } from '@/ui/Screen';
import { ScreenHeader } from '@/ui/ScreenHeader';
import { Toast } from '@/ui/Toast';
import { useGoBack } from '@/ui/useGoBack';
import { BridgePanel } from './components/BridgePanel';
import { IslandSummary } from './components/IslandSummary';
import { PathTrail } from './components/PathTrail';
import { SideQuestList } from './components/SideQuestList';
import { SideQuestSteps } from './components/SideQuestSteps';
import { StepEditSheet } from './components/StepEditSheet';
import { useCheer } from './hooks/useCheer';
import { islandsPaths } from './paths';

/** Het scherm van één eiland: hoe ver je staat, je stappen, en de side quests ernaast. */
export function IslandScreen() {
  const { islandId } = useParams();
  const navigate = useNavigate();
  const goBack = useGoBack(mapPaths.root);
  const detail = useIslandDetail(islandId);
  const [editingStep, setEditingStep] = useState<Step | null>(null);
  const [cheerMessage, cheer] = useCheer();
  const { cheers } = islandTexts;

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
      <Toast message={cheerMessage} />
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
          onLogged={(pillars, completed) => {
            if (completed) cheer(cheers.island);
            else if (pillars > 0) cheer(cheers.pillar);
          }}
        />
      ) : isSideQuest ? (
        <SideQuestSteps
          island={island}
          steps={steps}
          onEditStep={setEditingStep}
          onToggled={(completed) => completed && cheer(cheers.island)}
        />
      ) : (
        <PathTrail
          landmarks={landmarks}
          steps={steps}
          onEditStep={setEditingStep}
          onReached={(completed) => cheer(completed ? cheers.island : cheers.landmark)}
        />
      )}

      {!isSideQuest && <SideQuestList parentId={island.id} sideQuests={sideQuests} />}

      <StepEditSheet step={editingStep} onClose={() => setEditingStep(null)} />
    </Screen>
  );
}

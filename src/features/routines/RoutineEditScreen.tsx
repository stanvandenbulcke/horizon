import { useState } from 'react';
import { useParams } from 'react-router';
import {
  createRoutine,
  deleteRoutine,
  setRoutineActive,
  updateRoutine,
} from '@/actions/routines/manageRoutines';
import { navigationTexts } from '@/content/texts/navigation';
import { routineTexts } from '@/content/texts/routines';
import { useRoutine } from '@/data/hooks/useRoutines';
import { config } from '@/game/config';
import { ALL_WEEKDAYS } from '@/game/model';
import type { RoutineInput } from '@/game/routines/routine';
import { Button } from '@/ui/Button';
import { Screen } from '@/ui/Screen';
import { ScreenHeader } from '@/ui/ScreenHeader';
import { useGoBack } from '@/ui/useGoBack';
import { RoutineForm } from './components/RoutineForm';
import { routinesPaths } from './paths';
import styles from './RoutineEditScreen.module.css';

const emptyRoutine: RoutineInput = {
  name: '',
  emoji: config.routine.fallbackEmoji,
  shells: config.routine.minShells,
  weekdays: ALL_WEEKDAYS,
};

/** Een routine maken (zonder id in het adres) of aanpassen (met id). */
export function RoutineEditScreen() {
  const { routineId } = useParams();
  const backToList = useGoBack(routinesPaths.list);
  const routine = useRoutine(routineId);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isNew = routineId === undefined;

  const header = (
    <ScreenHeader
      title={isNew ? routineTexts.createTitle : routineTexts.editTitle}
      onBack={backToList}
      backLabel={navigationTexts.back}
    />
  );

  if (isNew) {
    return (
      <Screen>
        {header}
        <RoutineForm
          initial={emptyRoutine}
          onSubmit={async (input) => {
            const result = await createRoutine(input);
            if (!result.ok) return result.error;
            backToList();
            return null;
          }}
        />
      </Screen>
    );
  }

  if (routine === undefined) {
    return <Screen>{header}</Screen>;
  }

  if (routine === null) {
    return (
      <Screen>
        {header}
        <p className={styles.notFound}>{routineTexts.notFound}</p>
      </Screen>
    );
  }

  const remove = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    await deleteRoutine(routine.id);
    backToList();
  };

  return (
    <Screen>
      {header}
      <RoutineForm
        key={routine.id}
        initial={routine}
        onSubmit={async (input) => {
          const result = await updateRoutine(routine.id, input);
          if (!result.ok) return result.error;
          backToList();
          return null;
        }}
      />
      <div className={styles.extra}>
        <Button
          variant="secondary"
          fullWidth
          onClick={() => void setRoutineActive(routine.id, !routine.active)}
        >
          {routine.active ? routineTexts.pause : routineTexts.resume}
        </Button>
        <Button variant="danger" fullWidth onClick={() => void remove()}>
          {confirmDelete ? routineTexts.deleteConfirm : routineTexts.delete}
        </Button>
        <p className={styles.hint}>{routineTexts.deleteHint}</p>
      </div>
    </Screen>
  );
}

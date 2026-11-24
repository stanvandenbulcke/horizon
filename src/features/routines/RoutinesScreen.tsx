import { useNavigate } from 'react-router';
import { moveRoutine } from '@/actions/routines/manageRoutines';
import { navigationTexts } from '@/content/texts/navigation';
import { routineTexts } from '@/content/texts/routines';
import { useRoutines } from '@/data/hooks/useRoutines';
import { Button } from '@/ui/Button';
import { Screen } from '@/ui/Screen';
import { ScreenHeader } from '@/ui/ScreenHeader';
import { useGoBack } from '@/ui/useGoBack';
import { RoutineRow } from './components/RoutineRow';
import { routinesPaths } from './paths';
import styles from './RoutinesScreen.module.css';

/** Alle routines: aanpassen, volgorde veranderen, en nieuwe toevoegen. */
export function RoutinesScreen() {
  const navigate = useNavigate();
  const goBack = useGoBack();
  const routines = useRoutines();

  return (
    <Screen>
      <ScreenHeader
        title={routineTexts.listTitle}
        onBack={goBack}
        backLabel={navigationTexts.back}
      />
      <p className={styles.intro}>{routineTexts.listIntro}</p>

      {routines && routines.length === 0 && <p className={styles.empty}>{routineTexts.empty}</p>}

      {routines && routines.length > 0 && (
        <ul className={styles.list}>
          {routines.map((routine, index) => (
            <li key={routine.id}>
              <RoutineRow
                routine={routine}
                isFirst={index === 0}
                isLast={index === routines.length - 1}
                onOpen={() => navigate(routinesPaths.edit(routine.id))}
                onMove={(direction) => void moveRoutine(routine.id, direction)}
              />
            </li>
          ))}
        </ul>
      )}

      <div className={styles.actions}>
        <Button fullWidth onClick={() => navigate(routinesPaths.add)}>
          {routineTexts.pickFromList}
        </Button>
        <Button variant="secondary" fullWidth onClick={() => navigate(routinesPaths.create)}>
          {routineTexts.createOwn}
        </Button>
      </div>
    </Screen>
  );
}

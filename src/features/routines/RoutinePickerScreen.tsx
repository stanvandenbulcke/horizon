import { createRoutine } from '@/actions/routines/manageRoutines';
import { type DefaultRoutine, defaultRoutines } from '@/content/defaults/routines';
import { navigationTexts } from '@/content/texts/navigation';
import { routineTexts } from '@/content/texts/routines';
import { useRoutines } from '@/data/hooks/useRoutines';
import { ALL_WEEKDAYS } from '@/game/model';
import { Button } from '@/ui/Button';
import { Screen } from '@/ui/Screen';
import { ScreenHeader } from '@/ui/ScreenHeader';
import { useGoBack } from '@/ui/useGoBack';
import styles from './RoutinePickerScreen.module.css';

/** Kies routines uit de standaardlijst. Elke tik voegt er één toe (voor elke dag). */
export function RoutinePickerScreen() {
  const goBack = useGoBack();
  const routines = useRoutines();
  const existingNames = new Set(routines?.map((routine) => routine.name));
  const allAdded = defaultRoutines.every((routine) => existingNames.has(routine.name));

  const add = (routine: DefaultRoutine) => {
    void createRoutine({ ...routine, weekdays: ALL_WEEKDAYS });
  };

  return (
    <Screen>
      <ScreenHeader
        title={routineTexts.pickerTitle}
        onBack={goBack}
        backLabel={navigationTexts.back}
      />
      <p className={styles.intro}>
        {allAdded ? routineTexts.pickerAllAdded : routineTexts.pickerIntro}
      </p>

      <ul className={styles.grid}>
        {defaultRoutines.map((routine) => {
          const added = existingNames.has(routine.name);
          return (
            <li key={routine.name}>
              <button
                type="button"
                className={styles.option}
                disabled={added || !routines}
                onClick={() => add(routine)}
              >
                <span className={styles.emoji} aria-hidden="true">
                  {added ? '✅' : routine.emoji}
                </span>
                <span className={styles.name}>{routine.name}</span>
                <span className={styles.shells}>
                  {added ? routineTexts.pickerAdded : routineTexts.shellsOption(routine.shells)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <Button fullWidth onClick={goBack}>
        {routineTexts.done}
      </Button>
    </Screen>
  );
}

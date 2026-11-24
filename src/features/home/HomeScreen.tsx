import { useNavigate } from 'react-router';
import { toggleRoutine } from '@/actions/routines/toggleRoutine';
import { celebrationTexts } from '@/content/texts/celebrations';
import { homeTexts } from '@/content/texts/home';
import { useCompanion } from '@/data/hooks/useCompanion';
import { useDayLog } from '@/data/hooks/useDayLog';
import { useGameDay } from '@/data/hooks/useGameDay';
import { useProfile } from '@/data/hooks/useProfile';
import { useRoutines } from '@/data/hooks/useRoutines';
import { useShellBalance, useShellsEarnedOn } from '@/data/hooks/useShells';
import { celebrate } from '@/features/celebrations';
import { routinesPaths } from '@/features/routines';
import type { Routine } from '@/game/model';
import { routinesForDay } from '@/game/routines/routine';
import { goalProgress } from '@/game/shells/shells';
import { pickBySeed, pickRandom } from '@/lib/random';
import { Button } from '@/ui/Button';
import { Notice } from '@/ui/Notice';
import { Pill } from '@/ui/Pill';
import { Screen } from '@/ui/Screen';
import { CompanionPanel } from './components/CompanionPanel';
import { DailyGoal } from './components/DailyGoal';
import { RoutineCard } from './components/RoutineCard';
import styles from './HomeScreen.module.css';

/** 🏝️ Thuis: je routines van vandaag, je schelpen en je dagdoel. */
export function HomeScreen() {
  const navigate = useNavigate();
  const day = useGameDay();
  const profile = useProfile();
  const routines = useRoutines();
  const dayLog = useDayLog(day);
  const balance = useShellBalance();
  const earned = useShellsEarnedOn(day);
  const companion = useCompanion();

  const loading =
    !profile || !routines || dayLog === undefined || balance === undefined || earned === undefined;
  if (loading) {
    return <Screen tone="sky" withTabBar />;
  }

  const progress = goalProgress(earned, dayLog?.dailyGoal ?? profile.dailyGoal);
  const todaysRoutines = routinesForDay(routines, day);
  const completed = new Set(dayLog?.completedRoutineIds ?? []);

  const toggle = async (routine: Routine, card: HTMLElement) => {
    const result = await toggleRoutine(routine.id, day);
    if (!result.completed) return;
    if (result.goalReached) {
      const message = pickRandom(celebrationTexts.goalReached(profile.companionName));
      celebrate('medium', { message });
    } else {
      celebrate('small', { from: card });
    }
  };

  return (
    <Screen tone="sky" withTabBar>
      <div className={styles.topBar}>
        <Pill icon="🐚" label={homeTexts.shellBalance(balance)}>
          {balance}
        </Pill>
      </div>

      <h1 className={styles.greeting}>{pickBySeed(homeTexts.greetings, day)}</h1>

      {companion && <CompanionPanel name={profile.companionName} companion={companion} />}

      <DailyGoal progress={progress} day={day} />

      <section className={styles.today} aria-labelledby="today-title">
        <h2 id="today-title" className={styles.sectionTitle}>
          {homeTexts.todayTitle}
        </h2>

        {routines.length === 0 ? (
          <Notice {...homeTexts.noRoutines}>
            <Button onClick={() => navigate(routinesPaths.add)}>
              {homeTexts.noRoutines.button}
            </Button>
          </Notice>
        ) : todaysRoutines.length === 0 ? (
          <Notice
            icon={homeTexts.nothingToday.icon}
            title={homeTexts.nothingToday.title}
            text={pickBySeed(homeTexts.nothingToday.text, day)}
          />
        ) : (
          <ul className={styles.list}>
            {todaysRoutines.map((routine) => (
              <li key={routine.id}>
                <RoutineCard
                  routine={routine}
                  done={completed.has(routine.id)}
                  onToggle={(card) => void toggle(routine, card)}
                />
              </li>
            ))}
          </ul>
        )}

        {routines.length > 0 && (
          <Button variant="secondary" onClick={() => navigate(routinesPaths.list)}>
            {homeTexts.manageRoutines}
          </Button>
        )}
      </section>
    </Screen>
  );
}

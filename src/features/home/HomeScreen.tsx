import { useNavigate } from 'react-router';
import { toggleRoutine } from '@/actions/routines/toggleRoutine';
import { homeTexts } from '@/content/texts/home';
import { useDayLog } from '@/data/hooks/useDayLog';
import { useGameDay } from '@/data/hooks/useGameDay';
import { useProfile } from '@/data/hooks/useProfile';
import { useRoutines } from '@/data/hooks/useRoutines';
import { useShellBalance, useShellsEarnedOn } from '@/data/hooks/useShells';
import { routinesForDay } from '@/game/routines/routine';
import { goalProgress } from '@/game/shells/shells';
import { routinesPaths } from '@/features/routines';
import { pickBySeed } from '@/lib/random';
import { Button } from '@/ui/Button';
import { Notice } from '@/ui/Notice';
import { Pill } from '@/ui/Pill';
import { Screen } from '@/ui/Screen';
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

  const loading =
    !profile || !routines || dayLog === undefined || balance === undefined || earned === undefined;
  if (loading) {
    return <Screen tone="sky" withTabBar />;
  }

  const progress = goalProgress(earned, dayLog?.dailyGoal ?? profile.dailyGoal);
  const todaysRoutines = routinesForDay(routines, day);
  const completed = new Set(dayLog?.completedRoutineIds ?? []);

  return (
    <Screen tone="sky" withTabBar>
      <div className={styles.topBar}>
        <Pill icon="🐚" label={homeTexts.shellBalance(balance)}>
          {balance}
        </Pill>
      </div>

      <h1 className={styles.greeting}>{pickBySeed(homeTexts.greetings, day)}</h1>

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
                  onToggle={() => void toggleRoutine(routine.id, day)}
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

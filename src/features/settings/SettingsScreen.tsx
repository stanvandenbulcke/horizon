import { useNavigate } from 'react-router';
import { setDailyGoal, setSoundOn } from '@/actions/profile/profile';
import { navigationTexts } from '@/content/texts/navigation';
import { settingsTexts } from '@/content/texts/settings';
import { useGameDay } from '@/data/hooks/useGameDay';
import { useProfile } from '@/data/hooks/useProfile';
import { homePaths } from '@/features/home';
import { routinesPaths } from '@/features/routines';
import { config } from '@/game/config';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';
import { Screen } from '@/ui/Screen';
import { ScreenHeader } from '@/ui/ScreenHeader';
import { Stepper } from '@/ui/Stepper';
import { ToggleChip } from '@/ui/ToggleChip';
import { useGoBack } from '@/ui/useGoBack';
import { CompanionNameField } from './components/CompanionNameField';
import styles from './SettingsScreen.module.css';

/** ⚙️ Instellingen: dagdoel, naam van je reisgezel en routines. */
export function SettingsScreen() {
  const navigate = useNavigate();
  const goBack = useGoBack(homePaths.root);
  const day = useGameDay();
  const profile = useProfile();

  return (
    <Screen>
      <ScreenHeader title={settingsTexts.title} onBack={goBack} backLabel={navigationTexts.back} />

      {profile && (
        <>
          <Card title={settingsTexts.dailyGoal.title} hint={settingsTexts.dailyGoal.hint}>
            <Stepper
              value={profile.dailyGoal}
              min={config.dailyGoal.min}
              max={config.dailyGoal.max}
              onChange={(goal) => void setDailyGoal(goal, day)}
              unit={settingsTexts.dailyGoal.unit}
              decreaseLabel={settingsTexts.dailyGoal.decrease}
              increaseLabel={settingsTexts.dailyGoal.increase}
            />
          </Card>

          <Card title={settingsTexts.companion.title} hint={settingsTexts.companion.hint}>
            <CompanionNameField key={profile.companionName} initialName={profile.companionName} />
          </Card>

          <Card title={settingsTexts.sound.title} hint={settingsTexts.sound.hint}>
            <div className={styles.choice}>
              <ToggleChip pressed={profile.soundOn} onToggle={() => void setSoundOn(true)}>
                {settingsTexts.sound.on}
              </ToggleChip>
              <ToggleChip pressed={!profile.soundOn} onToggle={() => void setSoundOn(false)}>
                {settingsTexts.sound.off}
              </ToggleChip>
            </div>
          </Card>

          <Card title={settingsTexts.routines.title}>
            <Button variant="secondary" fullWidth onClick={() => navigate(routinesPaths.list)}>
              {settingsTexts.routines.button}
            </Button>
          </Card>
        </>
      )}
    </Screen>
  );
}

import { type FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { createSideQuest } from '@/actions/islands/manageIslands';
import { islandEmojis } from '@/content/defaults/islands';
import { islandTexts } from '@/content/texts/islands';
import { navigationTexts } from '@/content/texts/navigation';
import { config } from '@/game/config';
import type { SideQuestInputError } from '@/game/islands/islandInput';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';
import { EmojiPicker } from '@/ui/EmojiPicker';
import { Screen } from '@/ui/Screen';
import { ScreenHeader } from '@/ui/ScreenHeader';
import { TextField } from '@/ui/TextField';
import { useGoBack } from '@/ui/useGoBack';
import { TitleFields } from './components/TitleFields';
import { islandsPaths } from './paths';
import styles from './SideQuestCreateScreen.module.css';

const texts = islandTexts.sideQuests;

/** Een side quest maken: een klein eilandje naast een groot eiland, met 1 à 3 stappen. */
export function SideQuestCreateScreen() {
  const { islandId = '' } = useParams();
  const navigate = useNavigate();
  const goBack = useGoBack(islandsPaths.detail(islandId));
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('⭐');
  const [stepTitles, setStepTitles] = useState(['']);
  const [error, setError] = useState<SideQuestInputError | null>(null);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const result = await createSideQuest(islandId, { name, emoji, stepTitles });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    void navigate(islandsPaths.detail(result.island.id), { replace: true });
  };

  return (
    <Screen>
      <ScreenHeader title={texts.createTitle} onBack={goBack} backLabel={navigationTexts.back} />
      <form className={styles.form} onSubmit={(event) => void submit(event)}>
        <Card>
          <TextField
            label={texts.nameLabel}
            value={name}
            onChange={setName}
            placeholder={texts.namePlaceholder}
            maxLength={config.islands.maxNameLength}
          />
        </Card>
        <Card title={texts.stepsLabel}>
          <TitleFields
            titles={stepTitles}
            onChange={setStepTitles}
            max={config.islands.maxSideQuestSteps}
            placeholder={texts.stepPlaceholder}
            addLabel={texts.addStep}
            removeLabel={texts.removeStep}
          />
        </Card>
        <Card title={islandTexts.create.emojiLabel}>
          <EmojiPicker options={islandEmojis} value={emoji} onChange={setEmoji} />
        </Card>
        {error && (
          <p className={styles.error} role="alert">
            {texts.errors[error]}
          </p>
        )}
        <Button type="submit" fullWidth>
          {texts.save}
        </Button>
      </form>
    </Screen>
  );
}

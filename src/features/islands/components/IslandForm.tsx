import { type FormEvent, useState } from 'react';
import { islandColors, islandEmojis } from '@/content/defaults/islands';
import { islandTexts } from '@/content/texts/islands';
import { config } from '@/game/config';
import type { IslandInput, IslandInputError } from '@/game/islands/islandInput';
import type { IslandType } from '@/game/model';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';
import { ColorPicker } from '@/ui/ColorPicker';
import { EmojiPicker } from '@/ui/EmojiPicker';
import { TextField } from '@/ui/TextField';
import { ToggleChip } from '@/ui/ToggleChip';
import { parseAmount } from '@/features/islands/parseAmount';
import { TitleFields } from './TitleFields';
import styles from './IslandForm.module.css';

interface IslandFormProps {
  /** Slaat op en geeft een fout terug als er iets niet klopt (of null als het lukte). */
  onSubmit: (input: IslandInput) => Promise<IslandInputError | null>;
}

const texts = islandTexts.create;
const types: IslandType[] = ['path', 'bridge'];

/** Het formulier om een eiland te maken: naam, soort, icoon, kleur en tussendoelen. */
export function IslandForm({ onSubmit }: IslandFormProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<IslandType>('path');
  const [emoji, setEmoji] = useState(islandEmojis[0] ?? '🧭');
  const [color, setColor] = useState(islandColors[0]?.value ?? '#ff8fa3');
  const [landmarkTitles, setLandmarkTitles] = useState(['', '', '']);
  const [target, setTarget] = useState('');
  const [unit, setUnit] = useState('');
  const [error, setError] = useState<IslandInputError | null>(null);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const input = {
      name,
      type,
      emoji,
      color,
      landmarkTitles,
      targetAmount: parseAmount(target),
      unit,
    };
    setError(await onSubmit(input));
  };

  return (
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

      <Card title={texts.typeLabel}>
        <div className={styles.types}>
          {types.map((option) => (
            <ToggleChip key={option} pressed={type === option} onToggle={() => setType(option)}>
              <span className={styles.typeOption}>
                <span className={styles.typeIcon}>{texts.types[option].icon}</span>
                <span>{texts.types[option].label}</span>
              </span>
            </ToggleChip>
          ))}
        </div>
        <p className={styles.hint}>{texts.types[type].hint}</p>
      </Card>

      {type === 'path' ? (
        <Card title={texts.landmarksLabel} hint={texts.landmarksHint}>
          <TitleFields
            titles={landmarkTitles}
            onChange={setLandmarkTitles}
            max={config.islands.maxLandmarks}
            placeholder={texts.landmarkPlaceholder}
            addLabel={texts.addLandmark}
            removeLabel={texts.removeLandmark}
          />
        </Card>
      ) : (
        <Card>
          <TextField
            label={texts.targetLabel}
            value={target}
            onChange={setTarget}
            placeholder={texts.targetPlaceholder}
            inputMode="decimal"
          />
          <TextField
            label={texts.unitLabel}
            value={unit}
            onChange={setUnit}
            placeholder={texts.unitPlaceholder}
            maxLength={config.islands.maxUnitLength}
          />
        </Card>
      )}

      <Card title={texts.emojiLabel}>
        <EmojiPicker options={islandEmojis} value={emoji} onChange={setEmoji} />
      </Card>

      <Card title={texts.colorLabel}>
        <ColorPicker options={islandColors} value={color} onChange={setColor} />
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
  );
}

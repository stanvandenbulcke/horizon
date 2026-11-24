import { useState } from 'react';
import { updateIsland } from '@/actions/islands/manageIslands';
import { islandColors, islandEmojis } from '@/content/defaults/islands';
import { islandTexts } from '@/content/texts/islands';
import { parseAmount } from '@/features/islands/parseAmount';
import { config } from '@/game/config';
import type { Island } from '@/game/model';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';
import { ColorPicker } from '@/ui/ColorPicker';
import { EmojiPicker } from '@/ui/EmojiPicker';
import { TextField } from '@/ui/TextField';

interface IslandEditFormProps {
  island: Island;
  onSaved: () => void;
}

const texts = islandTexts.create;

/** Naam, icoon, kleur en (bij een brug) het doel van een eiland aanpassen. */
export function IslandEditForm({ island, onSaved }: IslandEditFormProps) {
  const [name, setName] = useState(island.name);
  const [emoji, setEmoji] = useState(island.emoji);
  const [color, setColor] = useState(island.color);
  const [target, setTarget] = useState(String(island.targetAmount ?? ''));
  const [unit, setUnit] = useState(island.unit ?? '');

  const save = async () => {
    await updateIsland(island.id, {
      name,
      emoji,
      color,
      targetAmount: parseAmount(target) ?? undefined,
      unit,
    });
    onSaved();
  };

  return (
    <>
      <Card>
        <TextField
          label={texts.nameLabel}
          value={name}
          onChange={setName}
          maxLength={config.islands.maxNameLength}
        />
        {island.type === 'bridge' && (
          <>
            <TextField
              label={texts.targetLabel}
              value={target}
              onChange={setTarget}
              inputMode="decimal"
            />
            <TextField
              label={texts.unitLabel}
              value={unit}
              onChange={setUnit}
              maxLength={config.islands.maxUnitLength}
            />
          </>
        )}
      </Card>
      <Card title={texts.emojiLabel}>
        <EmojiPicker options={islandEmojis} value={emoji} onChange={setEmoji} />
      </Card>
      <Card title={texts.colorLabel}>
        <ColorPicker options={islandColors} value={color} onChange={setColor} />
      </Card>
      <Button fullWidth onClick={() => void save()}>
        {islandTexts.editScreen.save}
      </Button>
    </>
  );
}

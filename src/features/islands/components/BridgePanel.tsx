import { useState } from 'react';
import { deleteStep, logBridgeAmount } from '@/actions/islands/steps';
import { islandTexts } from '@/content/texts/islands';
import { parseAmount } from '@/features/islands/parseAmount';
import { bridgeTotal, liveLandmarks } from '@/game/islands/progress';
import type { Island, Landmark, Step } from '@/game/model';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';
import { IconButton } from '@/ui/IconButton';
import { TextField } from '@/ui/TextField';
import styles from './BridgePanel.module.css';

interface BridgePanelProps {
  island: Island;
  landmarks: readonly Landmark[];
  steps: readonly Step[];
  /** Wordt aangeroepen na het leggen van planken (voor een feestje) */
  onLogged: (pillarsReached: number, islandCompleted: boolean) => void;
}

const texts = islandTexts.bridge;

/** Een brug bouwen: hoeveelheden toevoegen, pijlers zien verschijnen, planken bekijken. */
export function BridgePanel({ island, landmarks, steps, onLogged }: BridgePanelProps) {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [invalid, setInvalid] = useState(false);
  const unit = island.unit ?? '';
  const target = island.targetAmount ?? 0;
  const total = bridgeTotal(steps);
  const entries = steps
    .filter((step) => step.amount !== null)
    .sort((a, b) => (b.doneAt ?? 0) - (a.doneAt ?? 0));

  const add = async () => {
    const result = await logBridgeAmount(island.id, parseAmount(amount) ?? 0, note);
    setInvalid(result === null);
    if (result) {
      setAmount('');
      setNote('');
      onLogged(result.pillarsReached, result.islandCompleted);
    }
  };

  return (
    <>
      <Card
        title={texts.addTitle}
        hint={total >= target ? texts.done : texts.remaining(target - total, unit)}
      >
        <p className={styles.total}>{texts.total(total, target, unit)}</p>
        <TextField
          label={texts.amountLabel(unit)}
          value={amount}
          onChange={setAmount}
          inputMode="decimal"
          onEnter={() => void add()}
        />
        <TextField
          label={texts.notePlaceholder}
          hideLabel
          value={note}
          onChange={setNote}
          placeholder={texts.notePlaceholder}
          onEnter={() => void add()}
        />
        {invalid && (
          <p className={styles.error} role="alert">
            {texts.invalidAmount}
          </p>
        )}
        <Button fullWidth onClick={() => void add()}>
          {texts.add}
        </Button>
      </Card>

      <Card title={texts.pillarsTitle}>
        <ul className={styles.pillars}>
          {liveLandmarks(landmarks).map((pillar) => (
            <li key={pillar.id} className={pillar.completedAt ? styles.pillarDone : styles.pillar}>
              <span aria-hidden="true">{pillar.completedAt ? '🏛️' : '○'}</span> {pillar.title}
            </li>
          ))}
        </ul>
      </Card>

      {entries.length > 0 && (
        <Card title={texts.entriesTitle}>
          <ul className={styles.entries}>
            {entries.map((entry) => (
              <li key={entry.id} className={styles.entry}>
                <span className={styles.amount}>{texts.entry(entry.amount ?? 0, unit)}</span>
                <span className={styles.note}>{entry.title}</span>
                <IconButton
                  size="small"
                  label={texts.deleteEntry(entry.amount ?? 0, unit)}
                  onClick={() => void deleteStep(entry.id)}
                >
                  ✕
                </IconButton>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
}

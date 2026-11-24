import { IconButton } from './IconButton';
import styles from './Stepper.module.css';

interface StepperProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  /** Klein woordje achter het getal, bv. "schelpen" */
  unit?: string;
  decreaseLabel: string;
  increaseLabel: string;
}

/** Een getal met een − en + knop ernaast. */
export function Stepper({
  value,
  min,
  max,
  onChange,
  unit,
  decreaseLabel,
  increaseLabel,
}: StepperProps) {
  return (
    <div className={styles.stepper}>
      <IconButton label={decreaseLabel} onClick={() => onChange(value - 1)} disabled={value <= min}>
        −
      </IconButton>
      <output className={styles.value} aria-live="polite">
        <span className={styles.number}>{value}</span>
        {unit && <span className={styles.unit}>{unit}</span>}
      </output>
      <IconButton label={increaseLabel} onClick={() => onChange(value + 1)} disabled={value >= max}>
        +
      </IconButton>
    </div>
  );
}

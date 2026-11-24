import { ToggleChip } from './ToggleChip';
import styles from './EmojiPicker.module.css';

interface EmojiPickerProps {
  /** De iconen waaruit je kan kiezen */
  options: readonly string[];
  value: string;
  onChange: (emoji: string) => void;
}

/** Een raster met iconen; je kiest er één. */
export function EmojiPicker({ options, value, onChange }: EmojiPickerProps) {
  return (
    <div className={styles.grid}>
      {options.map((emoji) => (
        <ToggleChip
          key={emoji}
          size="large"
          pressed={emoji === value}
          onToggle={() => onChange(emoji)}
        >
          {emoji}
        </ToggleChip>
      ))}
    </div>
  );
}

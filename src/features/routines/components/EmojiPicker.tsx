import { routineEmojis } from '@/content/defaults/emojis';
import { ToggleChip } from '@/ui/ToggleChip';
import styles from './EmojiPicker.module.css';

interface EmojiPickerProps {
  value: string;
  onChange: (emoji: string) => void;
}

/** Een raster met iconen; je kiest er één. */
export function EmojiPicker({ value, onChange }: EmojiPickerProps) {
  return (
    <div className={styles.grid}>
      {routineEmojis.map((emoji) => (
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

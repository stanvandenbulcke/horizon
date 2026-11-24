import { useEffect, useEffectEvent, useState, useSyncExternalStore } from 'react';
import { playSound, type SoundName } from '@/audio/sounds';
import { useProfile } from '@/data/hooks/useProfile';
import { Toast } from '@/ui/Toast';
import {
  type Celebration,
  type CelebrationLevel,
  currentCelebration,
  subscribe,
} from './celebrationStore';
import { burst, shake } from './effects';

const sounds: Record<CelebrationLevel, SoundName> = {
  small: 'plop',
  medium: 'chime',
  big: 'fanfare',
};

/** Hoe lang de jubeltekst blijft staan (ms) */
const MESSAGE_MS: Record<CelebrationLevel, number> = { small: 2200, medium: 3200, big: 4500 };

/**
 * De feestlaag, één keer bovenaan de app. Speelt elk gevraagd feestje af: geluid, partikels,
 * een schudje en een jubeltekst. Hoe groter wat je haalde, hoe groter het feest.
 */
export function CelebrationLayer() {
  const celebration = useSyncExternalStore(subscribe, currentCelebration);
  const profile = useProfile();
  const [dismissedId, setDismissedId] = useState(0);

  // Leest altijd de nieuwste geluidsinstelling, zonder het effect opnieuw te starten
  const play = useEffectEvent((current: Celebration) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    burst(current, reduced);
    if (!reduced) shake(current.level);
    if (profile?.soundOn ?? true) playSound(sounds[current.level]);
  });

  useEffect(() => {
    if (!celebration) return;
    play(celebration);
    const timer = window.setTimeout(
      () => setDismissedId(celebration.id),
      MESSAGE_MS[celebration.level],
    );
    return () => window.clearTimeout(timer);
  }, [celebration]);

  const message = celebration && celebration.id !== dismissedId ? celebration.message : null;
  return <Toast message={message} />;
}

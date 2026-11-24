import { useCallback, useEffect, useRef, useState } from 'react';
import { pickRandom } from '@/lib/random';

const VISIBLE_MS = 3500;

/**
 * Een kort jubelberichtje dat even verschijnt en dan vanzelf weer weggaat.
 * Geeft het huidige bericht terug (of null) en een functie om er een te tonen.
 */
export function useCheer(): [string | null, (options: readonly string[]) => void] {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const cheer = useCallback((options: readonly string[]) => {
    window.clearTimeout(timer.current);
    setMessage(pickRandom(options));
    timer.current = window.setTimeout(() => setMessage(null), VISIBLE_MS);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return [message, cheer];
}

import { useEffect, useState } from 'react';
import type { GameDay } from '@/game/model';
import { msUntilNextDayStart, toGameDay } from '@/game/time/gameDay';

/**
 * De speldag van vandaag. Verandert vanzelf om 04:00, en ook als je de app
 * 's ochtends terug openhaalt nadat ze de hele nacht in de achtergrond stond.
 */
export function useGameDay(): GameDay {
  const [day, setDay] = useState(() => toGameDay(new Date()));

  useEffect(() => {
    const refresh = () => setDay(toGameDay(new Date()));
    // Een seconde marge, zodat we zeker na 04:00 kijken
    const timer = window.setTimeout(refresh, msUntilNextDayStart(new Date()) + 1000);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, [day]);

  return day;
}

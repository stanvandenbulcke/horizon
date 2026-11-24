import { describe, expect, it } from 'vitest';
import { config } from '@/game/config';
import { fogLevel } from './fog';

describe('mist boven een eiland', () => {
  it('hangt er bijna helemaal boven een nieuw eiland', () => {
    expect(fogLevel(0)).toBe(config.map.startFog);
  });

  it('trekt op naarmate je vordert', () => {
    expect(fogLevel(0.5)).toBeCloseTo(config.map.startFog / 2);
  });

  it('is helemaal weg als het eiland af is', () => {
    expect(fogLevel(1)).toBe(0);
    expect(fogLevel(1.4)).toBe(0);
  });
});

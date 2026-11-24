import { describe, expect, it } from 'vitest';
import { timeOfDayPalette } from './timeOfDay';

describe('dag-en-nachtgevoel', () => {
  it('kiest de juiste kleuren per uur', () => {
    expect(timeOfDayPalette(7).name).toBe('morning');
    expect(timeOfDayPalette(13).name).toBe('day');
    expect(timeOfDayPalette(19).name).toBe('evening');
    expect(timeOfDayPalette(23).name).toBe('night');
    expect(timeOfDayPalette(3).name).toBe('night');
  });
});

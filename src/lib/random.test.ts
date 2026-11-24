import { describe, expect, it } from 'vitest';
import { pickDifferent, pickRandom } from './random';

describe('pickRandom', () => {
  const items = ['a', 'b', 'c'] as const;

  it('kiest het eerste item als het toeval 0 geeft', () => {
    expect(pickRandom(items, () => 0)).toBe('a');
  });

  it('kiest het laatste item als het toeval bijna 1 geeft', () => {
    expect(pickRandom(items, () => 0.999)).toBe('c');
  });

  it('geeft een duidelijke fout bij een lege lijst', () => {
    expect(() => pickRandom([])).toThrow('de lijst is leeg');
  });
});

describe('pickDifferent', () => {
  it('kiest nooit twee keer na elkaar hetzelfde', () => {
    const items = ['a', 'b', 'c'];
    let previous = 'a';
    for (let i = 0; i < 100; i++) {
      const next = pickDifferent(items, previous);
      expect(next).not.toBe(previous);
      previous = next;
    }
  });

  it('geeft het enige item terug als er niets anders is', () => {
    expect(pickDifferent(['a'], 'a')).toBe('a');
  });
});

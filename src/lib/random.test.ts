import { describe, expect, it } from 'vitest';
import { pickBySeed, pickDifferent, pickRandom, seededRandom } from './random';

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

describe('pickBySeed', () => {
  const items = ['a', 'b', 'c', 'd', 'e'];

  it('kiest altijd hetzelfde voor hetzelfde zaadje', () => {
    expect(pickBySeed(items, '2026-11-24')).toBe(pickBySeed(items, '2026-11-24'));
  });

  it('kiest niet elke dag hetzelfde', () => {
    const picks = new Set(
      ['2026-11-20', '2026-11-21', '2026-11-22', '2026-11-23', '2026-11-24'].map((day) =>
        pickBySeed(items, day),
      ),
    );
    expect(picks.size).toBeGreaterThan(1);
  });
});

describe('seededRandom', () => {
  it('geeft voor hetzelfde zaadje altijd dezelfde reeks', () => {
    const a = seededRandom('eiland-1');
    const b = seededRandom('eiland-1');
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });

  it('geeft voor een ander zaadje een andere reeks', () => {
    expect(seededRandom('eiland-1')()).not.toBe(seededRandom('eiland-2')());
  });

  it('blijft altijd tussen 0 en 1', () => {
    const random = seededRandom('test');
    for (let i = 0; i < 1000; i++) {
      const value = random();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
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

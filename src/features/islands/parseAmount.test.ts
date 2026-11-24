import { describe, expect, it } from 'vitest';
import { parseAmount } from './parseAmount';

describe('parseAmount', () => {
  it('leest gewone getallen en getallen met een komma', () => {
    expect(parseAmount('500')).toBe(500);
    expect(parseAmount('12,5')).toBe(12.5);
    expect(parseAmount(' 1 000 ')).toBe(1000);
  });

  it('geeft null bij iets dat geen getal is', () => {
    expect(parseAmount('')).toBeNull();
    expect(parseAmount('veel')).toBeNull();
  });
});

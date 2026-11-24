import { describe, expect, it } from 'vitest';
import { clusterPuffs, ringPuffs } from './cloudLayout';

describe('mistwolkjes', () => {
  it('liggen voor hetzelfde eiland altijd op dezelfde plek', () => {
    expect(clusterPuffs('eiland-1', 2.3, 10)).toEqual(clusterPuffs('eiland-1', 2.3, 10));
  });

  it('blijven binnen de straal van het eiland', () => {
    for (const puff of clusterPuffs('eiland-2', 2.3, 50)) {
      expect(Math.hypot(puff.x, puff.z)).toBeLessThanOrEqual(2.3);
    }
  });

  it('maken precies zoveel wolkjes als gevraagd', () => {
    expect(clusterPuffs('eiland-3', 2, 0)).toHaveLength(0);
    expect(clusterPuffs('eiland-3', 2, 7)).toHaveLength(7);
  });

  it('vormen een ring buiten de bekende wereld', () => {
    for (const puff of ringPuffs('ring', 30, 40)) {
      expect(Math.hypot(puff.x, puff.z)).toBeGreaterThanOrEqual(30);
    }
  });
});

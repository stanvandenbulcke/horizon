import { describe, expect, it } from 'vitest';
import { creatureSpecies, creatureStage, speciesFor } from './creature';

describe('wezentjes', () => {
  it('krijgen per eiland altijd dezelfde soort', () => {
    expect(speciesFor('eiland-1')).toBe(speciesFor('eiland-1'));
    expect(creatureSpecies).toContain(speciesFor('eiland-2'));
  });

  it('komen uit het ei als stadium 1 en groeien per bezienswaardigheid', () => {
    expect(creatureStage(0)).toBe(1);
    expect(creatureStage(2)).toBe(3);
  });

  it('groeien niet verder dan het maximum', () => {
    expect(creatureStage(10)).toBe(4);
  });
});

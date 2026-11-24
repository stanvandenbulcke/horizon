import { describe, expect, it } from 'vitest';
import { gardenLayout, maxGardenPlants } from './gardenLayout';

describe('de tuin op je thuiseiland', () => {
  it('heeft evenveel plantjes als groeipunten', () => {
    expect(gardenLayout(0)).toHaveLength(0);
    expect(gardenLayout(5)).toHaveLength(5);
  });

  it('zet bestaande plantjes niet opnieuw ergens anders', () => {
    expect(gardenLayout(4)).toEqual(gardenLayout(5).slice(0, 4));
  });

  it('stopt als het eiland vol staat', () => {
    expect(gardenLayout(500)).toHaveLength(maxGardenPlants);
    expect(maxGardenPlants).toBeGreaterThan(15);
  });

  it('blijft op het gras van het eiland', () => {
    for (const plant of gardenLayout(maxGardenPlants)) {
      expect(Math.hypot(plant.x, plant.z)).toBeLessThan(2.4);
    }
  });
});

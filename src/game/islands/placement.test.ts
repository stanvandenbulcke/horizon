import { describe, expect, it } from 'vitest';
import { config } from '@/game/config';
import type { MapPosition } from '@/game/model';
import {
  distance,
  mapRadius,
  nextIslandPosition,
  sideQuestPosition,
  spiralPosition,
} from './placement';

describe('eilanden plaatsen op de kaart', () => {
  it('legt het eerste eiland op de eerste ring rond je thuiseiland', () => {
    const first = spiralPosition(0);
    expect(Math.hypot(first.x, first.z)).toBeCloseTo(config.map.firstRing, 1);
  });

  it('houdt de eerste 30 eilanden ver genoeg uit elkaar', () => {
    const positions = Array.from({ length: 30 }, (_, i) => spiralPosition(i));
    for (let a = 0; a < positions.length; a++) {
      for (let b = a + 1; b < positions.length; b++) {
        expect(distance(positions[a] as MapPosition, positions[b] as MapPosition)).toBeGreaterThan(
          config.map.minDistance * 0.9,
        );
      }
    }
  });

  it('kiest de eerste vrije plek', () => {
    const taken = [spiralPosition(0), spiralPosition(1)];
    expect(nextIslandPosition(taken)).toEqual(spiralPosition(2));
  });

  it('hergebruikt de plek van een verwijderd eiland', () => {
    const taken = [spiralPosition(1), spiralPosition(2)];
    expect(nextIslandPosition(taken)).toEqual(spiralPosition(0));
  });

  it('legt een side quest vlak naast zijn hoofdeiland', () => {
    const parent = { x: 10, z: 0 };
    const quest = sideQuestPosition(parent, []);
    expect(distance(parent, quest)).toBeCloseTo(config.map.sideQuestDistance, 1);
  });

  it('legt twee side quests niet op elkaar', () => {
    const parent = { x: 10, z: 0 };
    const first = sideQuestPosition(parent, []);
    const second = sideQuestPosition(parent, [first]);
    expect(distance(first, second)).toBeGreaterThan(1);
  });

  it('weet hoe groot de kaart is', () => {
    expect(mapRadius([])).toBe(0);
    expect(mapRadius([{ x: 3, z: 4 }])).toBe(5);
  });
});

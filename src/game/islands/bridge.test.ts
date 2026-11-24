import { describe, expect, it } from 'vitest';
import { buildLandmark } from '@/game/testing/builders';
import { pillarChanges } from './bridge';

const pillars = [
  buildLandmark('p25', 0, { threshold: 0.25 }),
  buildLandmark('p50', 1, { threshold: 0.5 }),
  buildLandmark('p75', 2, { threshold: 0.75 }),
  buildLandmark('p100', 3, { threshold: 1 }),
];

describe('pijlers van een brug', () => {
  it('bereikt de pijlers die het totaal passeerde', () => {
    expect(pillarChanges(pillars, 260, 500, 9)).toEqual([
      { id: 'p25', completedAt: 9 },
      { id: 'p50', completedAt: 9 },
    ]);
  });

  it('bereikt een pijler precies op de grens', () => {
    expect(pillarChanges(pillars, 125, 500, 9)).toEqual([{ id: 'p25', completedAt: 9 }]);
  });

  it('houdt de datum van een al bereikte pijler', () => {
    const done = [
      buildLandmark('p25', 0, { threshold: 0.25, completedAt: 3 }),
      ...pillars.slice(1),
    ];
    expect(pillarChanges(done, 130, 500, 9)).toEqual([]);
  });

  it('zet een pijler terug als je een hoeveelheid wist', () => {
    const done = [
      buildLandmark('p25', 0, { threshold: 0.25, completedAt: 3 }),
      ...pillars.slice(1),
    ];
    expect(pillarChanges(done, 100, 500, 9)).toEqual([{ id: 'p25', completedAt: null }]);
  });

  it('bereikt alles bij 100%', () => {
    expect(pillarChanges(pillars, 500, 500, 9)).toHaveLength(4);
  });
});

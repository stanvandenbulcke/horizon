import { describe, expect, it } from 'vitest';
import { config } from '@/game/config';
import { buildIsland, buildLandmark, buildStep } from '@/game/testing/builders';
import {
  allLandmarksReached,
  allStepsDone,
  bridgeTotal,
  currentLandmark,
  islandProgress,
} from './progress';

describe('de eerstvolgende bezienswaardigheid', () => {
  it('is de eerste die je nog niet bereikte, in jouw volgorde', () => {
    const landmarks = [
      buildLandmark('b', 1),
      buildLandmark('a', 0, { completedAt: 5 }),
      buildLandmark('c', 2),
    ];
    expect(currentLandmark(landmarks)?.id).toBe('b');
  });

  it('is er niet meer als alles bereikt is', () => {
    expect(currentLandmark([buildLandmark('a', 0, { completedAt: 5 })])).toBeNull();
  });
});

describe('voortgang van een pad', () => {
  const island = buildIsland();
  const landmarks = [
    buildLandmark('a', 0, { completedAt: 5 }),
    buildLandmark('b', 1),
    buildLandmark('c', 2),
    buildLandmark('d', 3),
  ];

  it('telt bereikte bezienswaardigheden', () => {
    expect(islandProgress(island, landmarks, [])).toBe(0.25);
  });

  it('telt gedane stappen naar de volgende bezienswaardigheid een beetje mee', () => {
    const steps = [
      buildStep('s1', { landmarkId: 'b', doneAt: 1 }),
      buildStep('s2', { landmarkId: 'b' }),
    ];
    const expected = (1 + 0.5 * config.islands.stepCredit) / 4;
    expect(islandProgress(island, landmarks, steps)).toBeCloseTo(expected);
  });

  it('bereikt nooit de volgende bezienswaardigheid met stappen alleen', () => {
    const steps = [buildStep('s1', { landmarkId: 'b', doneAt: 1 })];
    expect(islandProgress(island, landmarks, steps)).toBeLessThan(0.5);
  });

  it('is 1 als het eiland af is', () => {
    expect(islandProgress(buildIsland({ status: 'completed' }), landmarks, [])).toBe(1);
  });

  it('weet wanneer alles bereikt is', () => {
    expect(allLandmarksReached(landmarks)).toBe(false);
    expect(allLandmarksReached([buildLandmark('a', 0, { completedAt: 5 })])).toBe(true);
    expect(allLandmarksReached([])).toBe(false);
  });
});

describe('voortgang van een brug', () => {
  const island = buildIsland({ type: 'bridge', targetAmount: 500, unit: 'euro' });

  it('telt alleen gedane hoeveelheden', () => {
    const steps = [
      buildStep('a', { amount: 100, doneAt: 1 }),
      buildStep('b', { amount: 50, doneAt: 1 }),
      buildStep('c', { amount: 70 }),
      buildStep('d', { amount: 30, doneAt: 1, deletedAt: 2 }),
    ];
    expect(bridgeTotal(steps)).toBe(150);
    expect(islandProgress(island, [], steps)).toBe(0.3);
  });

  it('loopt niet over de 100%', () => {
    expect(islandProgress(island, [], [buildStep('a', { amount: 800, doneAt: 1 })])).toBe(1);
  });
});

describe('voortgang van een side quest', () => {
  const quest = buildIsland({ parentIslandId: 'groot' });

  it('telt de gedane stappen', () => {
    const steps = [buildStep('a', { doneAt: 1 }), buildStep('b'), buildStep('c')];
    expect(islandProgress(quest, [], steps)).toBeCloseTo(1 / 3);
    expect(allStepsDone(steps)).toBe(false);
  });

  it('is klaar als alle stappen gedaan zijn', () => {
    expect(allStepsDone([buildStep('a', { doneAt: 1 })])).toBe(true);
    expect(allStepsDone([])).toBe(false);
  });
});

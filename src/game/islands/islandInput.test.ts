import { describe, expect, it } from 'vitest';
import {
  cleanStepTitle,
  type IslandInput,
  validateAmount,
  validateIslandInput,
  validateSideQuestInput,
} from './islandInput';

const path: IslandInput = {
  name: '  Rijbewijs  ',
  type: 'path',
  emoji: '🚗',
  color: '#ff8fa3',
  landmarkTitles: ['Theorie', '  ', 'Lessen', 'Examen'],
  targetAmount: null,
  unit: '',
};

const bridge: IslandInput = {
  ...path,
  name: 'Sparen',
  type: 'bridge',
  landmarkTitles: [],
  targetAmount: 500,
  unit: ' euro ',
};

describe('een eiland maken', () => {
  it('maakt een pad schoon: spaties en lege bezienswaardigheden weg', () => {
    const result = validateIslandInput(path);
    expect(result.ok && result.value.name).toBe('Rijbewijs');
    expect(result.ok && result.value.landmarkTitles).toEqual(['Theorie', 'Lessen', 'Examen']);
  });

  it('vraagt om een naam', () => {
    expect(validateIslandInput({ ...path, name: ' ' })).toEqual({
      ok: false,
      error: 'nameRequired',
    });
  });

  it('vraagt om minstens één bezienswaardigheid bij een pad', () => {
    expect(validateIslandInput({ ...path, landmarkTitles: ['', ' '] })).toEqual({
      ok: false,
      error: 'landmarksRequired',
    });
  });

  it('neemt hoogstens 5 bezienswaardigheden', () => {
    const result = validateIslandInput({ ...path, landmarkTitles: ['1', '2', '3', '4', '5', '6'] });
    expect(result.ok && result.value.landmarkTitles).toHaveLength(5);
  });

  it('vraagt bij een brug een doelgetal en een eenheid', () => {
    expect(validateIslandInput({ ...bridge, targetAmount: 0 })).toEqual({
      ok: false,
      error: 'targetRequired',
    });
    expect(validateIslandInput({ ...bridge, unit: ' ' })).toEqual({
      ok: false,
      error: 'unitRequired',
    });
    const result = validateIslandInput(bridge);
    expect(result.ok && result.value.unit).toBe('euro');
  });
});

describe('een side quest maken', () => {
  it('vraagt om een naam en minstens één stap', () => {
    expect(validateSideQuestInput({ name: '', emoji: '⭐', stepTitles: ['a'] })).toEqual({
      ok: false,
      error: 'nameRequired',
    });
    expect(validateSideQuestInput({ name: 'Quest', emoji: '⭐', stepTitles: [' '] })).toEqual({
      ok: false,
      error: 'stepsRequired',
    });
  });
});

describe('stappen en hoeveelheden', () => {
  it('maakt een stapnaam schoon', () => {
    expect(cleanStepTitle('  Boek lezen ')).toBe('Boek lezen');
    expect(cleanStepTitle('   ')).toBeNull();
  });

  it('aanvaardt alleen hoeveelheden groter dan 0', () => {
    expect(validateAmount(12.345)).toBe(12.35);
    expect(validateAmount(0)).toBeNull();
    expect(validateAmount(-5)).toBeNull();
    expect(validateAmount(Number.NaN)).toBeNull();
    expect(validateAmount(null)).toBeNull();
  });
});

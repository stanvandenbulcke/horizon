import { describe, expect, it } from 'vitest';
import { ALL_WEEKDAYS, type Routine } from '@/game/model';
import {
  isScheduledOn,
  moveInOrder,
  nextOrder,
  routinesForDay,
  validateRoutineInput,
} from './routine';

function routine(id: string, order: number, overrides: Partial<Routine> = {}): Routine {
  return {
    id,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: null,
    name: id,
    emoji: '⭐',
    shells: 1,
    weekdays: [...ALL_WEEKDAYS],
    active: true,
    order,
    ...overrides,
  };
}

describe('validateRoutineInput', () => {
  const valid = { name: '  Lezen  ', emoji: '📖', shells: 2, weekdays: [3, 1, 1] as const };

  it('haalt spaties weg en sorteert de dagen', () => {
    expect(validateRoutineInput(valid)).toEqual({
      ok: true,
      value: { name: 'Lezen', emoji: '📖', shells: 2, weekdays: [1, 3] },
    });
  });

  it('vraagt om een naam', () => {
    expect(validateRoutineInput({ ...valid, name: '   ' })).toEqual({
      ok: false,
      error: 'nameRequired',
    });
  });

  it('vraagt om minstens één dag', () => {
    expect(validateRoutineInput({ ...valid, weekdays: [] })).toEqual({
      ok: false,
      error: 'noWeekdays',
    });
  });

  it('houdt de schelpen tussen 1 en 3', () => {
    const tooMany = validateRoutineInput({ ...valid, shells: 9 });
    const tooFew = validateRoutineInput({ ...valid, shells: 0 });
    expect(tooMany.ok && tooMany.value.shells).toBe(3);
    expect(tooFew.ok && tooFew.value.shells).toBe(1);
  });

  it('kiest een standaardicoon als je er geen koos', () => {
    const result = validateRoutineInput({ ...valid, emoji: ' ' });
    expect(result.ok && result.value.emoji).toBe('⭐');
  });
});

describe('welke routines staan vandaag gepland', () => {
  const monday = '2026-11-23';
  const saturday = '2026-11-28';

  it('volgt de gekozen dagen van de week', () => {
    const weekdaysOnly = routine('werk', 0, { weekdays: [1, 2, 3, 4, 5] });
    expect(isScheduledOn(weekdaysOnly, monday)).toBe(true);
    expect(isScheduledOn(weekdaysOnly, saturday)).toBe(false);
  });

  it('toont geen gepauzeerde of verwijderde routines', () => {
    expect(isScheduledOn(routine('pauze', 0, { active: false }), monday)).toBe(false);
    expect(isScheduledOn(routine('weg', 0, { deletedAt: 5 }), monday)).toBe(false);
  });

  it('houdt de zelfgekozen volgorde aan', () => {
    const list = [routine('c', 2), routine('a', 0), routine('b', 1)];
    expect(routinesForDay(list, monday).map((r) => r.id)).toEqual(['a', 'b', 'c']);
  });
});

describe('volgorde aanpassen', () => {
  const list = [routine('a', 0), routine('b', 1), routine('c', 2)];

  it('zet een nieuwe routine onderaan', () => {
    expect(nextOrder(list)).toBe(3);
    expect(nextOrder([])).toBe(0);
  });

  it('schuift een routine omhoog', () => {
    expect(moveInOrder(list, 'b', -1)).toEqual([
      { id: 'b', order: 0 },
      { id: 'a', order: 1 },
    ]);
  });

  it('schuift een routine omlaag', () => {
    expect(moveInOrder(list, 'b', 1)).toEqual([
      { id: 'c', order: 1 },
      { id: 'b', order: 2 },
    ]);
  });

  it('doet niets aan de rand van de lijst', () => {
    expect(moveInOrder(list, 'a', -1)).toEqual([]);
    expect(moveInOrder(list, 'c', 1)).toEqual([]);
  });
});

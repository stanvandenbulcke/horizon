import { describe, expect, it } from 'vitest';
import type { DayLog, ShellTransaction } from '@/game/model';
import { companionLevel, companionLook, goalDays, growthPoints, pointsToNextLevel } from './growth';

function log(day: string, dailyGoal: number): DayLog {
  return {
    id: day,
    day,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: null,
    completedRoutineIds: [],
    dailyGoal,
  };
}

function earned(day: string, amount: number): ShellTransaction {
  return {
    id: `${day}-${amount}-${Math.random()}`,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: null,
    day,
    amount,
    reason: 'routine',
    refId: null,
  };
}

describe('groeipunten van je reisgezel', () => {
  const logs = [log('2026-11-22', 5), log('2026-11-23', 5), log('2026-11-24', 3)];
  const transactions = [
    earned('2026-11-22', 3),
    earned('2026-11-22', 2),
    earned('2026-11-23', 4),
    earned('2026-11-24', 3),
  ];

  it('telt alleen dagen waarop je je dagdoel van die dag haalde', () => {
    expect(goalDays(logs, transactions)).toEqual(['2026-11-22', '2026-11-24']);
    expect(growthPoints(logs, transactions)).toBe(2);
  });

  it('telt niets zonder dagboekjes', () => {
    expect(growthPoints([], transactions)).toBe(0);
  });
});

describe('level van je reisgezel', () => {
  it('begint op level 1 en stijgt per 7 groeipunten', () => {
    expect(companionLevel(0)).toBe(1);
    expect(companionLevel(6)).toBe(1);
    expect(companionLevel(7)).toBe(2);
    expect(companionLevel(21)).toBe(4);
  });

  it('weet hoeveel punten er nog nodig zijn', () => {
    expect(pointsToNextLevel(0)).toBe(7);
    expect(pointsToNextLevel(5)).toBe(2);
    expect(pointsToNextLevel(7)).toBe(7);
  });

  it('krijgt een nieuwe look op level 3, 6 en 10', () => {
    expect(companionLook(1)).toBe(0);
    expect(companionLook(3)).toBe(1);
    expect(companionLook(6)).toBe(2);
    expect(companionLook(9)).toBe(2);
    expect(companionLook(10)).toBe(3);
  });
});

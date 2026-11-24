import { describe, expect, it } from 'vitest';
import type { ShellTransaction } from '@/game/model';
import {
  clampDailyGoal,
  goalJustReached,
  goalProgress,
  shellBalance,
  shellsEarnedOn,
} from './shells';

function transaction(day: string, amount: number, deleted = false): ShellTransaction {
  return {
    id: `${day}-${amount}-${Math.random()}`,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: deleted ? 1 : null,
    day,
    amount,
    reason: 'routine',
    refId: null,
  };
}

describe('schelpensaldo', () => {
  it('telt alle regels op', () => {
    expect(shellBalance([transaction('2026-11-23', 3), transaction('2026-11-24', 2)])).toBe(5);
  });

  it('telt ongedane regels niet mee', () => {
    expect(shellBalance([transaction('2026-11-24', 3), transaction('2026-11-24', 2, true)])).toBe(
      3,
    );
  });

  it('trekt uitgaven af', () => {
    expect(shellBalance([transaction('2026-11-24', 20), transaction('2026-11-24', -15)])).toBe(5);
  });

  it('is 0 zonder regels', () => {
    expect(shellBalance([])).toBe(0);
  });
});

describe('verdiende schelpen per dag', () => {
  const transactions = [
    transaction('2026-11-23', 3),
    transaction('2026-11-24', 2),
    transaction('2026-11-24', 1),
    transaction('2026-11-24', 3, true),
    transaction('2026-11-24', -15),
  ];

  it('telt alleen wat er die dag bij kwam', () => {
    expect(shellsEarnedOn(transactions, '2026-11-24')).toBe(3);
  });

  it('uitgeven maakt je dagdoel niet kleiner', () => {
    expect(shellsEarnedOn(transactions, '2026-11-24')).toBeGreaterThan(0);
  });
});

describe('dagdoel', () => {
  it('berekent hoeveel er nog nodig zijn', () => {
    expect(goalProgress(3, 5)).toEqual({
      earned: 3,
      goal: 5,
      remaining: 2,
      fraction: 0.6,
      reached: false,
    });
  });

  it('is gehaald bij precies het doel, en de ring loopt niet over', () => {
    const progress = goalProgress(7, 5);
    expect(progress.reached).toBe(true);
    expect(progress.remaining).toBe(0);
    expect(progress.fraction).toBe(1);
  });

  it('weet wanneer het dagdoel net gehaald werd', () => {
    expect(goalJustReached(4, 6, 5)).toBe(true);
    expect(goalJustReached(5, 6, 5)).toBe(false);
    expect(goalJustReached(2, 4, 5)).toBe(false);
  });

  it('houdt het dagdoel tussen 1 en 20', () => {
    expect(clampDailyGoal(0)).toBe(1);
    expect(clampDailyGoal(50)).toBe(20);
    expect(clampDailyGoal(6.4)).toBe(6);
  });
});

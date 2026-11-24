import { config } from '@/game/config';
import type { GameDay, ShellTransaction } from '@/game/model';

function isActive(transaction: ShellTransaction): boolean {
  return transaction.deletedAt === null;
}

/** Je schelpensaldo: de som van alle (niet-ongedane) regels in het kasboek. */
export function shellBalance(transactions: readonly ShellTransaction[]): number {
  return transactions.filter(isActive).reduce((sum, t) => sum + t.amount, 0);
}

/**
 * Hoeveel schelpen verdiende je op deze dag? Alleen wat erbij kwam telt mee;
 * schelpen uitgeven (bv. aan een schild) maakt je dagdoel nooit kleiner.
 */
export function shellsEarnedOn(transactions: readonly ShellTransaction[], day: GameDay): number {
  return transactions
    .filter((t) => isActive(t) && t.day === day && t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
}

export interface GoalProgress {
  earned: number;
  goal: number;
  /** Hoeveel er nog nodig zijn (nooit minder dan 0). */
  remaining: number;
  /** Van 0 tot 1, voor de voortgangsring. */
  fraction: number;
  reached: boolean;
}

export function goalProgress(earned: number, goal: number): GoalProgress {
  const safeGoal = Math.max(1, goal);
  return {
    earned,
    goal: safeGoal,
    remaining: Math.max(0, safeGoal - earned),
    fraction: Math.min(1, earned / safeGoal),
    reached: earned >= safeGoal,
  };
}

/** Werd het dagdoel net gehaald door deze actie? (voor het feestje) */
export function goalJustReached(earnedBefore: number, earnedAfter: number, goal: number): boolean {
  return earnedBefore < goal && earnedAfter >= goal;
}

/** Houdt het dagdoel tussen het minimum en maximum uit de config. */
export function clampDailyGoal(goal: number): number {
  const { min, max } = config.dailyGoal;
  return Math.min(max, Math.max(min, Math.round(goal)));
}

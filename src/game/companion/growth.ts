import { config } from '@/game/config';
import type { DayLog, GameDay, ShellTransaction } from '@/game/model';
import { shellsEarnedOn } from '@/game/shells/shells';

/** De dagen waarop je je dagdoel haalde (met het dagdoel van die dag). */
export function goalDays(
  dayLogs: readonly DayLog[],
  transactions: readonly ShellTransaction[],
): GameDay[] {
  return dayLogs
    .filter((log) => log.deletedAt === null)
    .filter((log) => shellsEarnedOn(transactions, log.day) >= log.dailyGoal)
    .map((log) => log.day)
    .sort();
}

/** Je reisgezel krijgt 1 groeipunt per dag waarop je je dagdoel haalde. */
export function growthPoints(
  dayLogs: readonly DayLog[],
  transactions: readonly ShellTransaction[],
): number {
  return goalDays(dayLogs, transactions).length;
}

/** Het level van je reisgezel: begint op 1, +1 per 7 groeipunten. */
export function companionLevel(points: number): number {
  return Math.floor(points / config.companion.pointsPerLevel) + 1;
}

/** Hoeveel groeipunten nog tot het volgende level. */
export function pointsToNextLevel(points: number): number {
  const { pointsPerLevel } = config.companion;
  return pointsPerLevel - (points % pointsPerLevel);
}

/** Welke look je reisgezel heeft: 0 (start), 1 (vanaf level 3), 2 (level 6), 3 (level 10). */
export function companionLook(level: number): number {
  return config.companion.lookLevels.filter((lookLevel) => level >= lookLevel).length;
}

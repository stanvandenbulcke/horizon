import { config } from '@/game/config';
import type { GameDay, IsoWeekday } from '@/game/model';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

/**
 * Welke speldag is het op dit moment? Een speldag begint om 04:00 (lokale tijd):
 * om 02:30 's nachts is het dus nog "gisteren".
 */
export function toGameDay(now: Date, dayStartHour: number = config.dayStartHour): GameDay {
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (now.getHours() < dayStartHour) {
    date.setDate(date.getDate() - 1);
  }
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * We rekenen met dagen in UTC (wereldtijd), zodat zomer- en wintertijd nooit
 * een dag te veel of te weinig opleveren.
 */
function toUtcMs(day: GameDay): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day);
  if (!match) {
    throw new Error(`Ongeldige speldag: ${day}`);
  }
  return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function fromUtcMs(ms: number): GameDay {
  const date = new Date(ms);
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

/** Telt dagen op (of af, met een negatief getal). */
export function addDays(day: GameDay, amount: number): GameDay {
  return fromUtcMs(toUtcMs(day) + amount * MS_PER_DAY);
}

/** Hoeveel dagen liggen er tussen twee speldagen? (positief als `to` later is) */
export function daysBetween(from: GameDay, to: GameDay): number {
  return Math.round((toUtcMs(to) - toUtcMs(from)) / MS_PER_DAY);
}

/** Welke dag van de week is het? 1 = maandag … 7 = zondag. */
export function weekdayOf(day: GameDay): IsoWeekday {
  const jsDay = new Date(toUtcMs(day)).getUTCDay(); // 0 = zondag in JavaScript
  return (jsDay === 0 ? 7 : jsDay) as IsoWeekday;
}

/** Hoeveel milliseconden tot de volgende speldag begint (de volgende 04:00)? */
export function msUntilNextDayStart(now: Date, dayStartHour: number = config.dayStartHour): number {
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate(), dayStartHour);
  if (next.getTime() <= now.getTime()) {
    next.setDate(next.getDate() + 1);
  }
  return next.getTime() - now.getTime();
}

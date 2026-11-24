import { describe, expect, it } from 'vitest';
import { addDays, daysBetween, msUntilNextDayStart, toGameDay, weekdayOf } from './gameDay';

// Let op: maanden tellen in JavaScript vanaf 0, dus 10 = november.
const HOUR = 60 * 60 * 1000;

describe('toGameDay – de dagwissel om 04:00', () => {
  it('om 03:59 is het nog gisteren', () => {
    expect(toGameDay(new Date(2026, 10, 24, 3, 59))).toBe('2026-11-23');
  });

  it('om 04:00 begint de nieuwe dag', () => {
    expect(toGameDay(new Date(2026, 10, 24, 4, 0))).toBe('2026-11-24');
  });

  it('om 23:59 is het nog steeds vandaag', () => {
    expect(toGameDay(new Date(2026, 10, 24, 23, 59))).toBe('2026-11-24');
  });

  it('nieuwjaarsnacht om 02:00 telt nog bij oudjaar', () => {
    expect(toGameDay(new Date(2027, 0, 1, 2, 0))).toBe('2026-12-31');
  });

  it('1 maart om 01:00 telt nog bij februari', () => {
    expect(toGameDay(new Date(2026, 2, 1, 1, 0))).toBe('2026-02-28');
  });

  it('klopt ook in de nacht dat de zomertijd begint', () => {
    expect(toGameDay(new Date(2026, 2, 29, 3, 30))).toBe('2026-03-28');
    expect(toGameDay(new Date(2026, 2, 29, 4, 0))).toBe('2026-03-29');
  });
});

describe('rekenen met speldagen', () => {
  it('telt dagen op over een maandgrens', () => {
    expect(addDays('2026-02-27', 2)).toBe('2026-03-01');
  });

  it('telt dagen op over het wissel naar wintertijd heen', () => {
    expect(addDays('2026-10-24', 2)).toBe('2026-10-26');
  });

  it('telt dagen af', () => {
    expect(addDays('2027-01-01', -1)).toBe('2026-12-31');
  });

  it('telt het aantal dagen ertussen, ook over zomertijd heen', () => {
    expect(daysBetween('2026-03-28', '2026-03-30')).toBe(2);
    expect(daysBetween('2026-11-24', '2026-11-20')).toBe(-4);
  });

  it('weet welke dag van de week het is', () => {
    expect(weekdayOf('2026-11-23')).toBe(1); // maandag
    expect(weekdayOf('2026-11-28')).toBe(6); // zaterdag
    expect(weekdayOf('2026-11-29')).toBe(7); // zondag
  });

  it('geeft een fout bij een ongeldige datum', () => {
    expect(() => addDays('24-11-2026', 1)).toThrow('Ongeldige speldag');
  });
});

describe('msUntilNextDayStart', () => {
  it('om 03:00 is het nog 1 uur tot de nieuwe dag', () => {
    expect(msUntilNextDayStart(new Date(2026, 10, 24, 3, 0))).toBe(HOUR);
  });

  it('precies om 04:00 duurt het 24 uur tot de volgende', () => {
    expect(msUntilNextDayStart(new Date(2026, 10, 24, 4, 0))).toBe(24 * HOUR);
  });

  it("om 22:00 's avonds is het nog 6 uur", () => {
    expect(msUntilNextDayStart(new Date(2026, 10, 24, 22, 0))).toBe(6 * HOUR);
  });

  it('telt het extra uur mee in de nacht dat de wintertijd begint', () => {
    // Op 25 oktober 2026 gaat de klok van 03:00 terug naar 02:00
    expect(msUntilNextDayStart(new Date(2026, 9, 25, 0, 0))).toBe(5 * HOUR);
  });
});

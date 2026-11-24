import type { IsoWeekday } from '@/game/model';

const weekdaysShort: Record<IsoWeekday, string> = {
  1: 'Ma',
  2: 'Di',
  3: 'Wo',
  4: 'Do',
  5: 'Vr',
  6: 'Za',
  7: 'Zo',
};

const weekdaysLong: Record<IsoWeekday, string> = {
  1: 'maandag',
  2: 'dinsdag',
  3: 'woensdag',
  4: 'donderdag',
  5: 'vrijdag',
  6: 'zaterdag',
  7: 'zondag',
};

/** Een korte samenvatting van de dagen, bv. "Elke dag", "Weekdagen" of "Ma, Wo, Vr". */
function scheduleSummary(weekdays: readonly IsoWeekday[]): string {
  const key = [...weekdays].sort((a, b) => a - b).join('');
  if (key === '1234567') return 'Elke dag';
  if (key === '12345') return 'Weekdagen';
  if (key === '67') return 'Weekend';
  return [...weekdays]
    .sort((a, b) => a - b)
    .map((day) => weekdaysShort[day])
    .join(', ');
}

// Teksten om routines te kiezen, te maken en aan te passen
export const routineTexts = {
  listTitle: 'Routines',
  listIntro: 'Kleine dingen die je elke dag (of sommige dagen) doet. Elk levert schelpen op.',
  empty: 'Nog geen routines. Kies er uit de lijst, of maak er zelf een.',
  pickFromList: 'Kies uit de lijst',
  createOwn: 'Eigen routine maken',
  paused: 'gepauzeerd',
  summary: (weekdays: readonly IsoWeekday[], shellCount: number) =>
    `${scheduleSummary(weekdays)} · ${shellCount} 🐚`,
  moveUp: (name: string) => `${name} naar boven`,
  moveDown: (name: string) => `${name} naar beneden`,

  pickerTitle: 'Kies routines',
  pickerIntro: 'Tik om toe te voegen. Je kan ze daarna nog aanpassen.',
  pickerAdded: 'Toegevoegd',
  pickerAllAdded: 'Je hebt ze allemaal al. Amai, ambitieus!',
  done: 'Klaar',

  createTitle: 'Nieuwe routine',
  editTitle: 'Routine aanpassen',
  notFound: 'Deze routine bestaat niet meer.',
  nameLabel: 'Naam',
  namePlaceholder: 'Bv. 20 min wandelen',
  emojiLabel: 'Icoon',
  shellsLabel: 'Schelpen',
  shellsHint: 'Hoe meer moeite, hoe meer schelpen.',
  shellsOption: (count: number) => `${count} 🐚`,
  weekdaysLabel: 'Op welke dagen?',
  everyDay: 'Elke dag',
  weekdayShort: (day: IsoWeekday) => weekdaysShort[day],
  weekdayLong: (day: IsoWeekday) => weekdaysLong[day],
  save: 'Opslaan',
  pause: 'Pauzeren',
  resume: 'Weer activeren',
  delete: 'Verwijderen',
  deleteConfirm: 'Zeker? Tik nog eens.',
  deleteHint: 'De schelpen die je ermee verdiende, hou je.',
  errors: {
    nameRequired: 'Geef je routine een naam, kapitein.',
    noWeekdays: 'Kies minstens één dag.',
  },
} as const;

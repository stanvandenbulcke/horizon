import type { IslandType } from '@/game/model';

function formatAmount(amount: number): string {
  return amount.toLocaleString('nl-BE', { maximumFractionDigits: 2 });
}

// Teksten van de eilandschermen: maken, bekijken, stappen en bruggen
export const islandTexts = {
  notFound: {
    icon: '🌊',
    title: 'Dit eiland is weggedreven',
    text: 'We vinden het niet meer terug. Misschien werd het verwijderd.',
  },
  edit: 'Eiland aanpassen',
  sideQuestBadge: 'Side quest',
  completedBadge: 'Verkend! 🏆',
  progressLabel: (percent: number) => `${percent}% verkend`,

  create: {
    title: 'Nieuw eiland',
    intro: 'Elk groot doel is een eiland. Hoe meer stappen je zet, hoe meer mist er optrekt.',
    nameLabel: 'Naam van je doel',
    namePlaceholder: 'Bv. Rijbewijs halen',
    typeLabel: 'Wat voor doel is het?',
    types: {
      path: { icon: '🧭', label: 'Pad', hint: 'Stappen in een volgorde, naar de vuurtoren.' },
      bridge: { icon: '🌉', label: 'Brug', hint: 'Een doel met een getal, bv. €500 sparen.' },
    } satisfies Record<IslandType, { icon: string; label: string; hint: string }>,
    emojiLabel: 'Icoon',
    colorLabel: 'Kleur van je vlag',
    landmarksLabel: 'Bezienswaardigheden',
    landmarksHint: 'De tussendoelen op weg naar de top. Ruwweg 3 à 5, je kan ze later aanpassen.',
    landmarkPlaceholder: (index: number) => `Bezienswaardigheid ${index + 1}`,
    addLandmark: '+ Nog een bezienswaardigheid',
    removeLandmark: (index: number) => `Bezienswaardigheid ${index + 1} weghalen`,
    targetLabel: 'Doelgetal',
    targetPlaceholder: 'Bv. 500',
    unitLabel: 'Eenheid',
    unitPlaceholder: 'Bv. euro, km of woorden',
    save: 'Eiland maken',
    errors: {
      nameRequired: 'Geef je eiland een naam, kapitein.',
      landmarksRequired: 'Vul minstens één bezienswaardigheid in.',
      targetRequired: 'Vul een doelgetal in dat groter is dan 0.',
      unitRequired: 'Vul een eenheid in, bv. euro of km.',
    },
  },

  path: {
    firstStepPrompt: 'Wat is je eerste stap, kapitein?',
    nextStepsPrompt: 'De mist trekt op! Wat zijn je volgende stappen, kapitein?',
    planHint: 'Je plant alleen wat je ziet: stappen voor deze bezienswaardigheid.',
    stepPlaceholder: 'Een nieuwe stap…',
    addStep: 'Toevoegen',
    allDoneQuestion: (title: string) => `Alle stappen gedaan! Heb je "${title}" bereikt?`,
    reach: 'Bereikt! 🏁',
    reached: 'Bereikt',
    reopen: (title: string) => `"${title}" toch nog niet bereikt`,
    inTheFog: 'Nog in de mist',
    landmarkCount: (reached: number, total: number) =>
      `${reached} van ${total} bezienswaardigheden bereikt`,
  },

  steps: {
    toggleLabel: (title: string) => `${title} afvinken`,
    edit: (title: string) => `${title} aanpassen`,
    sheetTitle: 'Stap aanpassen',
    nameLabel: 'Stap',
    save: 'Opslaan',
    moveUp: 'Omhoog',
    moveDown: 'Omlaag',
    delete: 'Verwijderen',
    close: 'Sluiten',
  },

  bridge: {
    total: (total: number, target: number, unit: string) =>
      `${formatAmount(total)} van ${formatAmount(target)} ${unit}`,
    remaining: (amount: number, unit: string) => `Nog ${formatAmount(amount)} ${unit} te gaan.`,
    done: 'De brug is af! Je kan naar de overkant.',
    addTitle: 'Planken leggen',
    amountLabel: (unit: string) => `Hoeveel ${unit}?`,
    notePlaceholder: 'Notitie (mag leeg)',
    add: 'Toevoegen',
    invalidAmount: 'Vul een getal in dat groter is dan 0.',
    pillarsTitle: 'Pijlers',
    entriesTitle: 'Gelegde planken',
    entry: (amount: number, unit: string) => `+${formatAmount(amount)} ${unit}`,
    deleteEntry: (amount: number, unit: string) => `${formatAmount(amount)} ${unit} weghalen`,
  },

  sideQuests: {
    title: 'Side quests',
    hint: 'Kleine eilandjes naast dit eiland, met 1 à 3 stappen.',
    add: '+ Side quest',
    createTitle: 'Nieuwe side quest',
    nameLabel: 'Naam',
    namePlaceholder: 'Bv. Theorieboek kopen',
    stepsLabel: 'Stappen (1 à 3)',
    stepPlaceholder: (index: number) => `Stap ${index + 1}`,
    addStep: '+ Nog een stap',
    removeStep: (index: number) => `Stap ${index + 1} weghalen`,
    save: 'Side quest maken',
    errors: {
      nameRequired: 'Geef je side quest een naam.',
      stepsRequired: 'Vul minstens één stap in.',
    },
    stepsLeft: (done: number, total: number) =>
      `${done} van ${total} ${total === 1 ? 'stap' : 'stappen'}`,
  },

  editScreen: {
    title: 'Eiland aanpassen',
    landmarksTitle: 'Bezienswaardigheden',
    renameLandmark: 'Naam aanpassen',
    newLandmarkPlaceholder: 'Nieuwe bezienswaardigheid…',
    add: 'Toevoegen',
    moveUp: (title: string) => `${title} naar boven`,
    moveDown: (title: string) => `${title} naar beneden`,
    deleteLandmark: (title: string) => `${title} verwijderen`,
    save: 'Opslaan',
    delete: 'Eiland verwijderen',
    deleteConfirm: 'Zeker? Tik nog eens.',
    deleteHint: 'Alles wat erop staat, verdwijnt ook. Je schelpen hou je.',
  },
} as const;

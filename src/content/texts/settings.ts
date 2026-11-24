// Teksten van het instellingenscherm (het tandwiel rechtsboven)
export const settingsTexts = {
  title: 'Instellingen',
  dailyGoal: {
    title: 'Dagdoel',
    hint: 'Hoeveel schelpen wil je per dag verdienen?',
    unit: 'schelpen',
    decrease: 'Dagdoel verlagen',
    increase: 'Dagdoel verhogen',
  },
  companion: {
    title: 'Reisgezel',
    label: 'Naam',
    hint: 'Hij woont op je thuiseiland en groeit mee met je routines.',
  },
  routines: {
    title: 'Routines',
    button: 'Routines beheren',
  },
  sound: {
    title: 'Geluid',
    hint: 'Plopjes, belletjes en fanfares bij een feestje.',
    on: '🔊 Aan',
    off: '🔇 Uit',
  },
} as const;

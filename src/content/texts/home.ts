function shells(count: number): string {
  return count === 1 ? '1 schelp' : `${count} schelpen`;
}

// Teksten van het thuisscherm. Lijsten hebben varianten: elke dag wordt er één gekozen.
export const homeTexts = {
  greetings: [
    'Ahoy, kapitein!',
    'Land in zicht!',
    'Allee, de zee wacht op u.',
    'Amai, wat een weer om uit te varen.',
    'Wind in de zeilen, koffie in de hand.',
    'Anker op! Of straks. Geen stress.',
    'Goeiemorgen, kapitein. Of -middag. De zee kijkt niet op een uur.',
    'Kleine stapjes, grote zee.',
  ],
  shellBalance: (count: number) => `${shells(count)} gespaard`,
  dailyGoal: 'Dagdoel',
  dailyGoalProgress: (earned: number, goal: number) => `${earned} van ${shells(goal)} verdiend`,
  goalRemaining: (remaining: number) => `Nog ${shells(remaining)} tot je dagdoel.`,
  goalReached: [
    'Dagdoel gehaald! Goe bezig, kapitein.',
    'Amai! Dagdoel binnen.',
    'Land in zicht! Dagdoel gehaald.',
    'Dagdoel: check. De rest van de dag is bonus.',
    'Allee, dat is binnen. Extra schelpen mogen altijd.',
  ],
  todayTitle: 'Vandaag',
  routineShells: (count: number) => `+${count}`,
  routineLabel: (name: string, count: number) => `${name}, ${shells(count)}`,
  noRoutines: {
    icon: '🐚',
    title: 'Nog geen routines',
    text: 'Kies er een paar uit, en verdien je eerste schelpen.',
    button: 'Routines kiezen',
  },
  nothingToday: {
    icon: '⛵',
    title: 'Niets gepland vandaag',
    text: [
      'Een rustige dag op zee. Geniet ervan.',
      'Vandaag geen routines. De zee is kalm, de kapitein ook.',
      'Vrije dag! Zelfs piraten hebben er een nodig.',
    ],
  },
  manageRoutines: 'Routines aanpassen',
} as const;

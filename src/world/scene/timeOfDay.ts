/** De kleuren van lucht, zee en licht op een bepaald moment van de dag. */
export interface TimeOfDayPalette {
  name: 'morning' | 'day' | 'evening' | 'night';
  sky: string;
  seaShallow: string;
  seaDeep: string;
  sunColor: string;
  sunIntensity: number;
  hemiSky: string;
  hemiGround: string;
}

const palettes: Record<TimeOfDayPalette['name'], TimeOfDayPalette> = {
  morning: {
    name: 'morning',
    sky: '#a8dcf2',
    seaShallow: '#5fd3e6',
    seaDeep: '#1f86c2',
    sunColor: '#ffe0b5',
    sunIntensity: 1.5,
    hemiSky: '#cdeeff',
    hemiGround: '#f4d29a',
  },
  day: {
    name: 'day',
    sky: '#8fd6f3',
    seaShallow: '#4fd0e6',
    seaDeep: '#1782c0',
    sunColor: '#fff6e5',
    sunIntensity: 1.7,
    hemiSky: '#d9f3ff',
    hemiGround: '#f6d9a0',
  },
  evening: {
    name: 'evening',
    sky: '#ffbe94',
    seaShallow: '#56bfd6',
    seaDeep: '#2a6fb0',
    sunColor: '#ffc08a',
    sunIntensity: 1.5,
    hemiSky: '#ffd9c2',
    hemiGround: '#e8b98a',
  },
  night: {
    name: 'night',
    sky: '#25365e',
    seaShallow: '#2f7fa8',
    seaDeep: '#15406e',
    sunColor: '#b3c4ff',
    sunIntensity: 0.9,
    hemiSky: '#8fa6e0',
    hemiGround: '#3a4a6a',
  },
};

/** Welke kleuren horen bij dit uur? Een licht dag-en-nachtgevoel, nooit echt donker. */
export function timeOfDayPalette(hour: number): TimeOfDayPalette {
  if (hour >= 6 && hour < 10) return palettes.morning;
  if (hour >= 10 && hour < 18) return palettes.day;
  if (hour >= 18 && hour < 21) return palettes.evening;
  return palettes.night;
}

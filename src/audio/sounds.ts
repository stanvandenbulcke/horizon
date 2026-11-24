import { pickRandom, type RandomSource } from '@/lib/random';
import { audioContext, playTone } from './synth';

/** De geluiden van Horizon, van klein naar groot. */
export type SoundName = 'plop' | 'chime' | 'fanfare';

type Recipe = (ctx: AudioContext, random: RandomSource) => void;

// Toonhoogtes van een paar vrolijke majeur-akkoorden (C, F, G)
const chords = [
  [523.25, 659.25, 783.99],
  [349.23, 440.0, 523.25],
  [392.0, 493.88, 587.33],
];

/** Per geluid een paar varianten; elke keer wordt er willekeurig één gekozen. */
const recipes: Record<SoundName, Recipe[]> = {
  plop: [
    (ctx, random) => {
      const pitch = 520 + random() * 260;
      playTone(ctx, { frequency: pitch, slideTo: pitch * 0.55, duration: 0.13 });
    },
    (ctx, random) => {
      const pitch = 600 + random() * 200;
      playTone(ctx, { frequency: pitch, slideTo: pitch * 1.6, duration: 0.1, type: 'triangle' });
    },
    (ctx, random) => {
      const pitch = 700 + random() * 150;
      playTone(ctx, { frequency: pitch, duration: 0.06, type: 'triangle' });
      playTone(ctx, { frequency: pitch * 1.5, start: 0.07, duration: 0.08, type: 'triangle' });
    },
  ],
  chime: [
    (ctx, random) => {
      const chord = pickRandom(chords, random);
      chord.forEach((frequency, i) => {
        playTone(ctx, { frequency, start: i * 0.09, duration: 0.35, type: 'triangle' });
      });
    },
    (ctx, random) => {
      const chord = pickRandom(chords, random);
      [...chord].reverse().forEach((frequency, i) => {
        playTone(ctx, { frequency: frequency * 2, start: i * 0.07, duration: 0.3, volume: 0.1 });
      });
      playTone(ctx, {
        frequency: chord[0] ?? 523.25,
        start: 0.22,
        duration: 0.5,
        type: 'triangle',
      });
    },
  ],
  fanfare: [
    (ctx, random) => {
      const chord = pickRandom(chords, random);
      const [root = 523.25, third = 659.25, fifth = 783.99] = chord;
      [root, third, fifth, root * 2].forEach((frequency, i) => {
        playTone(ctx, { frequency, start: i * 0.12, duration: 0.18, type: 'square', volume: 0.07 });
      });
      [root, third, fifth].forEach((frequency) => {
        playTone(ctx, { frequency, start: 0.5, duration: 1.1, type: 'triangle', volume: 0.12 });
      });
    },
  ],
};

/** Speelt een geluid (een willekeurige variant). Doet niets als de browser geen geluid kan. */
export function playSound(name: SoundName, random: RandomSource = Math.random): void {
  const ctx = audioContext();
  if (!ctx) return;
  pickRandom(recipes[name], random)(ctx, random);
}

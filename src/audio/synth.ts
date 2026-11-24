/**
 * Een piepklein synthesizertje met de Web Audio API: alle geluiden worden in code gemaakt,
 * zonder geluidsbestanden. Zo blijft de app klein en werkt geluid ook offline.
 */

let context: AudioContext | null = null;

/** Geeft de audio-context, of null als de browser geen geluid kan maken. */
export function audioContext(): AudioContext | null {
  if (typeof window === 'undefined' || !('AudioContext' in window)) return null;
  context ??= new AudioContext();
  // Safari start geluid pas na een tik van de gebruiker; resume() regelt dat
  if (context.state === 'suspended') void context.resume();
  return context;
}

export interface ToneOptions {
  /** Toonhoogte in Hertz (440 = de "la") */
  frequency: number;
  /** Wanneer de toon start, in seconden vanaf nu */
  start?: number;
  duration: number;
  type?: OscillatorType;
  volume?: number;
  /** Laat de toon tijdens het spelen naar deze hoogte glijden */
  slideTo?: number;
}

/** Speelt één toon met een zachte aanslag en uitsterving (geen harde klikjes). */
export function playTone(ctx: AudioContext, options: ToneOptions): void {
  const { frequency, start = 0, duration, type = 'sine', volume = 0.16, slideTo } = options;
  const begin = ctx.currentTime + start;
  const end = begin + duration;

  const oscillator = ctx.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, begin);
  if (slideTo) oscillator.frequency.exponentialRampToValueAtTime(slideTo, end);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, begin);
  gain.gain.exponentialRampToValueAtTime(volume, begin + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(begin);
  oscillator.stop(end + 0.05);
}

import confetti from 'canvas-confetti';
import type { Celebration } from './celebrationStore';

const colors = ['#ffc53d', '#ff8fa3', '#4fc3f0', '#62cf6b', '#ffffff', '#a274ff'];

// Schelpjes en sterretjes als confetti, één keer gemaakt
let emojiShapes: confetti.Shape[] | null = null;
function shapes(): confetti.Shape[] {
  emojiShapes ??= [
    confetti.shapeFromText({ text: '🐚', scalar: 2 }),
    confetti.shapeFromText({ text: '⭐', scalar: 2 }),
  ];
  return [...emojiShapes, 'circle', 'square'];
}

const defaultOrigin = { x: 0.5, y: 0.45 };

/** Een klein spatje vanaf de knop waarop je tikte. */
function small(origin: Celebration['origin'], reduced: boolean) {
  void confetti({
    particleCount: reduced ? 6 : 18,
    spread: 70,
    startVelocity: 22,
    gravity: 1.2,
    ticks: 90,
    scalar: 0.9,
    origin: origin ?? defaultOrigin,
    colors,
    shapes: shapes(),
    disableForReducedMotion: false,
  });
}

/** Een flinke regen vanuit beide hoeken. */
function medium(reduced: boolean) {
  const count = reduced ? 20 : 70;
  [0.15, 0.85].forEach((x, i) => {
    void confetti({
      particleCount: count,
      angle: i === 0 ? 60 : 120,
      spread: 65,
      startVelocity: 45,
      origin: { x, y: 0.75 },
      colors,
      shapes: shapes(),
    });
  });
}

/** Vuurwerk: een paar seconden lang knallen er bundels boven je scherm. */
function big(reduced: boolean) {
  if (reduced) {
    medium(true);
    return;
  }
  const bursts = 7;
  for (let i = 0; i < bursts; i++) {
    window.setTimeout(() => {
      void confetti({
        particleCount: 90,
        spread: 360,
        startVelocity: 30,
        ticks: 120,
        gravity: 0.8,
        origin: { x: 0.15 + Math.random() * 0.7, y: 0.15 + Math.random() * 0.35 },
        colors,
        shapes: shapes(),
      });
    }, i * 320);
  }
}

/** Speelt de partikels van een feestje af, passend bij de grootte. */
export function burst(celebration: Celebration, reduced: boolean): void {
  if (celebration.level === 'small') small(celebration.origin, reduced);
  if (celebration.level === 'medium') medium(reduced);
  if (celebration.level === 'big') big(reduced);
}

/** Laat het hele scherm even schudden (in plaats van trillen, wat een webapp niet kan). */
export function shake(level: Celebration['level']): void {
  const root = document.getElementById('root');
  if (!root) return;
  const strength = level === 'big' ? 10 : level === 'medium' ? 6 : 2.5;
  root.animate(
    [
      { transform: 'translate(0, 0)' },
      { transform: `translate(${-strength}px, ${strength / 2}px) rotate(-0.4deg)` },
      { transform: `translate(${strength}px, ${-strength / 2}px) rotate(0.4deg)` },
      { transform: `translate(${-strength / 2}px, 0)` },
      { transform: 'translate(0, 0)' },
    ],
    { duration: level === 'small' ? 220 : 420, easing: 'ease-out' },
  );
}

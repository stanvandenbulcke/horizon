import { config } from '@/game/config';
import type { IslandType } from '@/game/model';

/** Wat je invult als je een eiland maakt. */
export interface IslandInput {
  name: string;
  type: IslandType;
  emoji: string;
  color: string;
  /** Alleen bij een pad: de namen van de bezienswaardigheden */
  landmarkTitles: readonly string[];
  /** Alleen bij een brug: het doelgetal en de eenheid */
  targetAmount: number | null;
  unit: string;
}

export type IslandInputError =
  'nameRequired' | 'landmarksRequired' | 'targetRequired' | 'unitRequired';

export type IslandValidation =
  { ok: true; value: IslandInput } | { ok: false; error: IslandInputError };

/** Wat je invult voor een side quest: een naam en 1 tot 3 stappen. */
export interface SideQuestInput {
  name: string;
  emoji: string;
  stepTitles: readonly string[];
}

export type SideQuestInputError = 'nameRequired' | 'stepsRequired';

function cleanTitles(titles: readonly string[], max: number): string[] {
  return titles
    .map((title) => title.trim().slice(0, config.islands.maxStepLength))
    .filter((title) => title !== '')
    .slice(0, max);
}

/** Controleert en verbetert wat je invulde voor een nieuw eiland. */
export function validateIslandInput(input: IslandInput): IslandValidation {
  const name = input.name.trim().slice(0, config.islands.maxNameLength);
  if (name === '') return { ok: false, error: 'nameRequired' };

  if (input.type === 'path') {
    const landmarkTitles = cleanTitles(input.landmarkTitles, config.islands.maxLandmarks);
    if (landmarkTitles.length === 0) return { ok: false, error: 'landmarksRequired' };
    return { ok: true, value: { ...input, name, landmarkTitles, targetAmount: null, unit: '' } };
  }

  const targetAmount = validateAmount(input.targetAmount);
  if (targetAmount === null) return { ok: false, error: 'targetRequired' };
  const unit = input.unit.trim().slice(0, config.islands.maxUnitLength);
  if (unit === '') return { ok: false, error: 'unitRequired' };
  return { ok: true, value: { ...input, name, landmarkTitles: [], targetAmount, unit } };
}

export function validateSideQuestInput(
  input: SideQuestInput,
): { ok: true; value: SideQuestInput } | { ok: false; error: SideQuestInputError } {
  const name = input.name.trim().slice(0, config.islands.maxNameLength);
  if (name === '') return { ok: false, error: 'nameRequired' };
  const stepTitles = cleanTitles(input.stepTitles, config.islands.maxSideQuestSteps);
  if (stepTitles.length === 0) return { ok: false, error: 'stepsRequired' };
  return { ok: true, value: { ...input, name, stepTitles } };
}

/** Een geldige stapnaam, of null als er niets (zinnigs) ingevuld is. */
export function cleanStepTitle(title: string): string | null {
  const clean = title.trim().slice(0, config.islands.maxStepLength);
  return clean === '' ? null : clean;
}

/** Een geldige hoeveelheid (groter dan 0, op 2 cijfers na de komma), of null. */
export function validateAmount(amount: number | null): number | null {
  if (amount === null || !Number.isFinite(amount) || amount <= 0) return null;
  return Math.round(amount * 100) / 100;
}

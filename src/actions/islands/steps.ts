import { db } from '@/data/db';
import { markDeleted, newRecordFields } from '@/data/records';
import { stepRepository } from '@/data/repositories/stepRepository';
import { cleanStepTitle, validateAmount } from '@/game/islands/islandInput';
import type { Id, Step } from '@/game/model';
import { moveInOrder, nextOrder } from '@/game/ordering';
import { type IslandRefresh, islandTables, refreshIsland } from './islandStatus';

async function requireStep(id: Id): Promise<Step> {
  const step = await stepRepository.get(id);
  if (!step) throw new Error(`Stap ${id} niet gevonden`);
  return step;
}

async function siblingsOf(step: Pick<Step, 'islandId' | 'landmarkId'>): Promise<Step[]> {
  const steps = await stepRepository.listByIsland(step.islandId);
  return steps.filter((other) => other.landmarkId === step.landmarkId);
}

/** Plant een nieuwe stap (naar een bezienswaardigheid, of bij een side quest). */
export async function addStep(
  islandId: Id,
  landmarkId: Id | null,
  title: string,
  now: number = Date.now(),
): Promise<Step | null> {
  const clean = cleanStepTitle(title);
  if (!clean) return null;
  return db.transaction('rw', islandTables(), async () => {
    const step: Step = {
      ...newRecordFields(now),
      islandId,
      landmarkId,
      title: clean,
      amount: null,
      order: nextOrder(await siblingsOf({ islandId, landmarkId })),
      doneAt: null,
    };
    await stepRepository.put(step);
    await refreshIsland(islandId, now, { active: false });
    return step;
  });
}

export interface ToggleStepResult extends IslandRefresh {
  done: boolean;
}

/** Vinkt een stap af, of haalt het vinkje weg als ze al gedaan was. */
export async function toggleStep(id: Id, now: number = Date.now()): Promise<ToggleStepResult> {
  return db.transaction('rw', islandTables(), async () => {
    const step = await requireStep(id);
    const done = step.doneAt === null;
    await stepRepository.put({ ...step, doneAt: done ? now : null, updatedAt: now });
    const refresh = await refreshIsland(step.islandId, now, { active: done });
    return { ...refresh, done };
  });
}

export async function renameStep(id: Id, title: string, now = Date.now()): Promise<void> {
  const clean = cleanStepTitle(title);
  if (!clean) return;
  const step = await requireStep(id);
  await stepRepository.put({ ...step, title: clean, updatedAt: now });
}

export async function deleteStep(id: Id, now: number = Date.now()): Promise<void> {
  await db.transaction('rw', islandTables(), async () => {
    const step = await requireStep(id);
    await stepRepository.put(markDeleted(step, now));
    await refreshIsland(step.islandId, now, { active: false });
  });
}

export async function moveStep(id: Id, direction: -1 | 1, now = Date.now()): Promise<void> {
  await db.transaction('rw', islandTables(), async () => {
    const step = await requireStep(id);
    const siblings = await siblingsOf(step);
    const changes = moveInOrder(siblings, id, direction);
    await stepRepository.putMany(
      changes.flatMap(({ id: changedId, order }) => {
        const sibling = siblings.find((s) => s.id === changedId);
        return sibling ? [{ ...sibling, order, updatedAt: now }] : [];
      }),
    );
  });
}

/** Legt planken op een brug: een hoeveelheid die je bij elkaar bracht (bv. €50 gespaard). */
export async function logBridgeAmount(
  islandId: Id,
  amount: number,
  note: string,
  now: number = Date.now(),
): Promise<IslandRefresh | null> {
  const value = validateAmount(amount);
  if (value === null) return null;
  return db.transaction('rw', islandTables(), async () => {
    await stepRepository.put({
      ...newRecordFields(now),
      islandId,
      landmarkId: null,
      title: cleanStepTitle(note) ?? '',
      amount: value,
      order: nextOrder(await stepRepository.listByIsland(islandId)),
      doneAt: now,
    });
    return refreshIsland(islandId, now);
  });
}

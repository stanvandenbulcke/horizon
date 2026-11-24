import { db } from '@/data/db';
import { markDeleted, newRecordFields } from '@/data/records';
import { islandRepository } from '@/data/repositories/islandRepository';
import { landmarkRepository } from '@/data/repositories/landmarkRepository';
import { stepRepository } from '@/data/repositories/stepRepository';
import { config } from '@/game/config';
import {
  type IslandInput,
  type IslandInputError,
  type SideQuestInput,
  type SideQuestInputError,
  validateAmount,
  validateIslandInput,
  validateSideQuestInput,
} from '@/game/islands/islandInput';
import { nextIslandPosition, sideQuestPosition } from '@/game/islands/placement';
import type { Id, Island, Landmark } from '@/game/model';
import { islandTables, refreshIsland } from './islandStatus';

export type CreateResult<E> = { ok: true; island: Island } | { ok: false; error: E };

function newIsland(fields: Omit<Island, keyof ReturnType<typeof newRecordFields>>, now: number) {
  return { ...newRecordFields(now), ...fields };
}

/** Maakt een nieuw eiland, op de eerste vrije plek van de spiraal rond je thuiseiland. */
export async function createIsland(
  input: IslandInput,
  now: number = Date.now(),
): Promise<CreateResult<IslandInputError>> {
  const validation = validateIslandInput(input);
  if (!validation.ok) return validation;
  const value = validation.value;

  return db.transaction('rw', islandTables(), async () => {
    const existing = await islandRepository.list();
    const island: Island = newIsland(
      {
        name: value.name,
        type: value.type,
        emoji: value.emoji,
        color: value.color,
        status: 'active',
        parentIslandId: null,
        position: nextIslandPosition(existing.map((other) => other.position)),
        lastActivityAt: now,
        targetAmount: value.type === 'bridge' ? value.targetAmount : null,
        unit: value.type === 'bridge' ? value.unit : null,
      },
      now,
    );
    const landmark = (title: string, order: number, threshold: number | null): Landmark => ({
      ...newRecordFields(now),
      islandId: island.id,
      title,
      order,
      threshold,
      completedAt: null,
    });
    const landmarks =
      value.type === 'path'
        ? value.landmarkTitles.map((title, order) => landmark(title, order, null))
        : config.islands.bridgeThresholds.map((t, order) => landmark(`${t * 100}%`, order, t));

    await islandRepository.put(island);
    await landmarkRepository.putMany(landmarks);
    return { ok: true, island };
  });
}

/** Maakt een side quest: een klein eilandje vlak naast een groot eiland, met 1 tot 3 stappen. */
export async function createSideQuest(
  parentId: Id,
  input: SideQuestInput,
  now: number = Date.now(),
): Promise<CreateResult<SideQuestInputError>> {
  const validation = validateSideQuestInput(input);
  if (!validation.ok) return validation;
  const value = validation.value;

  return db.transaction('rw', islandTables(), async () => {
    const parent = await islandRepository.get(parentId);
    if (!parent) throw new Error('Hoofdeiland niet gevonden');
    const siblings = (await islandRepository.list()).filter((i) => i.parentIslandId === parentId);
    const island: Island = newIsland(
      {
        name: value.name,
        type: 'path',
        emoji: value.emoji,
        color: parent.color,
        status: 'active',
        parentIslandId: parentId,
        position: sideQuestPosition(
          parent.position,
          siblings.map((s) => s.position),
        ),
        lastActivityAt: now,
        targetAmount: null,
        unit: null,
      },
      now,
    );
    await islandRepository.put(island);
    await stepRepository.putMany(
      value.stepTitles.map((title, order) => ({
        ...newRecordFields(now),
        islandId: island.id,
        landmarkId: null,
        title,
        amount: null,
        order,
        doneAt: null,
      })),
    );
    return { ok: true, island };
  });
}

export interface IslandChanges {
  name?: string;
  emoji?: string;
  color?: string;
  targetAmount?: number;
  unit?: string;
}

/** Past naam, icoon, kleur of (bij een brug) het doel aan. Lege waarden worden genegeerd. */
export async function updateIsland(
  id: Id,
  changes: IslandChanges,
  now: number = Date.now(),
): Promise<void> {
  await db.transaction('rw', islandTables(), async () => {
    const island = await islandRepository.get(id);
    if (!island) return;
    const name = changes.name?.trim().slice(0, config.islands.maxNameLength);
    const unit = changes.unit?.trim().slice(0, config.islands.maxUnitLength);
    const target = changes.targetAmount === undefined ? null : validateAmount(changes.targetAmount);
    await islandRepository.put({
      ...island,
      name: name || island.name,
      emoji: changes.emoji || island.emoji,
      color: changes.color || island.color,
      targetAmount: island.type === 'bridge' && target !== null ? target : island.targetAmount,
      unit: island.type === 'bridge' && unit ? unit : island.unit,
      updatedAt: now,
    });
    // Een ander doel kan pijlers of "af" veranderen
    await refreshIsland(id, now, { active: false });
  });
}

/** Verwijdert een eiland met al zijn bezienswaardigheden, stappen en side quests. */
export async function deleteIsland(id: Id, now: number = Date.now()): Promise<void> {
  await db.transaction('rw', islandTables(), async () => {
    const islands = await islandRepository.list();
    const doomed = islands.filter((island) => island.id === id || island.parentIslandId === id);
    for (const island of doomed) {
      const landmarks = await landmarkRepository.listByIsland(island.id);
      const steps = await stepRepository.listByIsland(island.id);
      await landmarkRepository.putMany(landmarks.map((l) => markDeleted(l, now)));
      await stepRepository.putMany(steps.map((s) => markDeleted(s, now)));
      await islandRepository.put(markDeleted(island, now));
    }
  });
}

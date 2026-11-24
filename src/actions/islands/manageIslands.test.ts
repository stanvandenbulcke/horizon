import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '@/data/db';
import { islandRepository } from '@/data/repositories/islandRepository';
import { landmarkRepository } from '@/data/repositories/landmarkRepository';
import { stepRepository } from '@/data/repositories/stepRepository';
import { config } from '@/game/config';
import { distance } from '@/game/islands/placement';
import { bridgeInput, pathInput } from '@/game/testing/builders';
import { createIsland, createSideQuest, deleteIsland, updateIsland } from './manageIslands';

beforeEach(async () => {
  await Promise.all(db.tables.map((table) => table.clear()));
});

describe('eilanden maken', () => {
  it('maakt een pad met zijn bezienswaardigheden in volgorde', async () => {
    const result = await createIsland(pathInput);
    if (!result.ok) throw new Error(result.error);
    const landmarks = await landmarkRepository.listByIsland(result.island.id);
    expect(landmarks.sort((a, b) => a.order - b.order).map((l) => l.title)).toEqual([
      'Theorie',
      'Lessen',
      'Examen',
    ]);
  });

  it('maakt een brug met pijlers op 25, 50, 75 en 100%', async () => {
    const result = await createIsland(bridgeInput);
    if (!result.ok) throw new Error(result.error);
    const pillars = await landmarkRepository.listByIsland(result.island.id);
    expect(pillars.map((p) => p.threshold).sort()).toEqual([...config.islands.bridgeThresholds]);
    expect(result.island.targetAmount).toBe(500);
  });

  it('legt elk nieuw eiland op een eigen plek', async () => {
    const first = await createIsland(pathInput);
    const second = await createIsland(bridgeInput);
    if (!first.ok || !second.ok) throw new Error('niet gelukt');
    expect(distance(first.island.position, second.island.position)).toBeGreaterThan(5);
  });

  it('geeft een fout terug zonder iets op te slaan', async () => {
    expect(await createIsland({ ...pathInput, name: '' })).toEqual({
      ok: false,
      error: 'nameRequired',
    });
    expect(await islandRepository.list()).toEqual([]);
  });

  it('maakt een side quest naast zijn hoofdeiland, met stappen', async () => {
    const parent = await createIsland(pathInput);
    if (!parent.ok) throw new Error(parent.error);
    const quest = await createSideQuest(parent.island.id, {
      name: 'Theorieboek kopen',
      emoji: '📘',
      stepTitles: ['Winkel zoeken', 'Kopen'],
    });
    if (!quest.ok) throw new Error(quest.error);
    expect(quest.island.parentIslandId).toBe(parent.island.id);
    expect(await stepRepository.listByIsland(quest.island.id)).toHaveLength(2);
    expect(distance(parent.island.position, quest.island.position)).toBeLessThan(6);
  });
});

describe('eilanden aanpassen en verwijderen', () => {
  it('past naam en icoon aan', async () => {
    const result = await createIsland(pathInput);
    if (!result.ok) throw new Error(result.error);
    await updateIsland(result.island.id, { name: 'Rijbewijs B', emoji: '🚙' });
    const island = await islandRepository.get(result.island.id);
    expect(island?.name).toBe('Rijbewijs B');
    expect(island?.emoji).toBe('🚙');
  });

  it('verwijdert een eiland met zijn side quests', async () => {
    const parent = await createIsland(pathInput);
    if (!parent.ok) throw new Error(parent.error);
    await createSideQuest(parent.island.id, { name: 'Quest', emoji: '⭐', stepTitles: ['a'] });
    await deleteIsland(parent.island.id);
    expect(await islandRepository.list()).toEqual([]);
    expect(await landmarkRepository.listAll()).toEqual([]);
    expect(await stepRepository.listAll()).toEqual([]);
  });
});

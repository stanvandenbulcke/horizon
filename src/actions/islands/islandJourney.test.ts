import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '@/data/db';
import { islandRepository } from '@/data/repositories/islandRepository';
import { landmarkRepository } from '@/data/repositories/landmarkRepository';
import { stepRepository } from '@/data/repositories/stepRepository';
import { currentLandmark } from '@/game/islands/progress';
import { bridgeInput, pathInput } from '@/game/testing/builders';
import { addLandmark, reachLandmark, reopenLandmark } from './landmarks';
import { createIsland, createSideQuest, updateIsland } from './manageIslands';
import { addStep, deleteStep, logBridgeAmount, toggleStep } from './steps';

/*
 * Deze tests spelen een volledige reis na: van een nieuw eiland tot het af is.
 */

beforeEach(async () => {
  await Promise.all(db.tables.map((table) => table.clear()));
});

async function newIsland(input = pathInput) {
  const result = await createIsland(input, 1000);
  if (!result.ok) throw new Error(result.error);
  return result.island;
}

describe('een pad bewandelen', () => {
  it('plant stappen voor de eerstvolgende bezienswaardigheid en bereikt ze', async () => {
    const island = await newIsland();
    const first = currentLandmark(await landmarkRepository.listByIsland(island.id));
    expect(first?.title).toBe('Theorie');

    const step = await addStep(island.id, first!.id, 'Theorieboek lezen', 2000);
    expect((await toggleStep(step!.id, 3000)).done).toBe(true);
    expect((await islandRepository.get(island.id))?.lastActivityAt).toBe(3000);

    const result = await reachLandmark(first!.id, 4000);
    expect(result.islandCompleted).toBe(false);
    const next = currentLandmark(await landmarkRepository.listByIsland(island.id));
    expect(next?.title).toBe('Lessen');
  });

  it('is af als de laatste bezienswaardigheid bereikt is', async () => {
    const island = await newIsland();
    const landmarks = (await landmarkRepository.listByIsland(island.id)).sort(
      (a, b) => a.order - b.order,
    );
    await reachLandmark(landmarks[0]!.id);
    await reachLandmark(landmarks[1]!.id);
    const last = await reachLandmark(landmarks[2]!.id);

    expect(last.islandCompleted).toBe(true);
    expect((await islandRepository.get(island.id))?.status).toBe('completed');
  });

  it('gaat weer open als je een nieuwe bezienswaardigheid toevoegt of er een heropent', async () => {
    const island = await newIsland({ ...pathInput, landmarkTitles: ['Enige'] });
    const [only] = await landmarkRepository.listByIsland(island.id);
    await reachLandmark(only!.id);
    await addLandmark(island.id, 'Nog één');
    expect((await islandRepository.get(island.id))?.status).toBe('active');

    await reopenLandmark(only!.id);
    expect(currentLandmark(await landmarkRepository.listByIsland(island.id))?.id).toBe(only!.id);
  });
});

describe('een brug bouwen', () => {
  it('bereikt pijlers naarmate je hoeveelheden toevoegt', async () => {
    const island = await newIsland(bridgeInput);
    const first = await logBridgeAmount(island.id, 130, 'Eerste spaarpot');
    expect(first).toEqual({ islandCompleted: false, pillarsReached: 1 });

    const second = await logBridgeAmount(island.id, 400, '');
    expect(second).toEqual({ islandCompleted: true, pillarsReached: 3 });
  });

  it('zet pijlers terug als je een hoeveelheid wist', async () => {
    const island = await newIsland(bridgeInput);
    await logBridgeAmount(island.id, 300, '');
    const [entry] = await stepRepository.listByIsland(island.id);
    await deleteStep(entry!.id);
    const pillars = await landmarkRepository.listByIsland(island.id);
    expect(pillars.every((pillar) => pillar.completedAt === null)).toBe(true);
  });

  it('aanvaardt geen hoeveelheid van 0', async () => {
    const island = await newIsland(bridgeInput);
    expect(await logBridgeAmount(island.id, 0, '')).toBeNull();
  });

  it('is af als je het doel verlaagt tot onder wat je al hebt', async () => {
    const island = await newIsland(bridgeInput);
    await logBridgeAmount(island.id, 300, '');
    await updateIsland(island.id, { targetAmount: 250 });
    expect((await islandRepository.get(island.id))?.status).toBe('completed');
  });
});

describe('een side quest afwerken', () => {
  it('is af als alle stappen gedaan zijn, en weer open als je er een terugzet', async () => {
    const parent = await newIsland();
    const quest = await createSideQuest(parent.id, {
      name: 'Quest',
      emoji: '⭐',
      stepTitles: ['Een', 'Twee'],
    });
    if (!quest.ok) throw new Error(quest.error);
    const [one, two] = await stepRepository.listByIsland(quest.island.id);

    expect((await toggleStep(one!.id)).islandCompleted).toBe(false);
    expect((await toggleStep(two!.id)).islandCompleted).toBe(true);
    await toggleStep(two!.id);
    expect((await islandRepository.get(quest.island.id))?.status).toBe('active');
  });
});

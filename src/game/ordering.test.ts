import { describe, expect, it } from 'vitest';
import { moveInOrder, nextOrder, sortByOrder } from './ordering';

const list = [
  { id: 'a', order: 0 },
  { id: 'b', order: 1 },
  { id: 'c', order: 2 },
];

describe('volgorde', () => {
  it('sorteert op volgnummer', () => {
    expect(sortByOrder([list[2]!, list[0]!, list[1]!]).map((i) => i.id)).toEqual(['a', 'b', 'c']);
  });

  it('zet iets nieuws onderaan de lijst', () => {
    expect(nextOrder(list)).toBe(3);
    expect(nextOrder([])).toBe(0);
  });

  it('schuift iets omhoog', () => {
    expect(moveInOrder(list, 'b', -1)).toEqual([
      { id: 'b', order: 0 },
      { id: 'a', order: 1 },
    ]);
  });

  it('schuift iets omlaag', () => {
    expect(moveInOrder(list, 'b', 1)).toEqual([
      { id: 'c', order: 1 },
      { id: 'b', order: 2 },
    ]);
  });

  it('doet niets aan de rand van de lijst', () => {
    expect(moveInOrder(list, 'a', -1)).toEqual([]);
    expect(moveInOrder(list, 'c', 1)).toEqual([]);
  });

  it('herstelt gaten in de nummering', () => {
    const gappy = [
      { id: 'a', order: 0 },
      { id: 'b', order: 5 },
      { id: 'c', order: 9 },
    ];
    expect(moveInOrder(gappy, 'c', -1)).toEqual([
      { id: 'c', order: 1 },
      { id: 'b', order: 2 },
    ]);
  });
});

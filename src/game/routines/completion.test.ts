import { describe, expect, it } from 'vitest';
import { withCompletion } from './completion';

describe('withCompletion', () => {
  it('vinkt een routine af', () => {
    expect(withCompletion(['a'], 'b', true)).toEqual(['a', 'b']);
  });

  it('haalt een vinkje weg', () => {
    expect(withCompletion(['a', 'b'], 'a', false)).toEqual(['b']);
  });

  it('vinkt nooit twee keer af', () => {
    expect(withCompletion(['a'], 'a', true)).toEqual(['a']);
  });
});

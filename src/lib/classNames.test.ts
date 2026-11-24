import { describe, expect, it } from 'vitest';
import { cx } from './classNames';

describe('cx', () => {
  it('plakt klassen aan elkaar', () => {
    expect(cx('a', 'b')).toBe('a b');
  });

  it('slaat lege waarden over', () => {
    expect(cx('a', false, undefined, null, '', 'b')).toBe('a b');
  });
});

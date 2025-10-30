import {
  describe,
  expect,
  test,
} from '@jest/globals';
import { memoize } from '../../src';

describe('memoize', () => {
  test('memoize', () => {
    let initializeCount = 0;
    const memoized = memoize((a: number, b: number) => {
      initializeCount++;
      return a + b;
    });

    expect(initializeCount).toBe(0);

    expect(memoized(1, 2)).toBe(3);

    expect(initializeCount).toBe(1);

    expect(memoized(1, 2)).toBe(3);

    expect(initializeCount).toBe(1);
  });
});

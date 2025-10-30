import {
  describe,
  expect,
  test,
} from '@jest/globals';
import { singleton } from '../../src';

describe('singleton', () => {
  test('singleton', () => {
    let initializeCount = 0;
    const memoized = singleton(() => {
      initializeCount++;
      return {};
    });

    expect(initializeCount).toBe(0);

    const instance = memoized();

    expect(memoized()).toBe(instance);

    expect(initializeCount).toBe(1);

    expect(memoized()).toBe(instance);

    expect(initializeCount).toBe(1);
  });
});

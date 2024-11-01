import { describe, expect, test } from '@jest/globals';
import { hasFlag, mergeFlags, offFlag, onFlag } from '../../src';

describe('hasFlag', () => {
  test('hasFlag / mergeFlags / onFlag / offFlag', () => {
    const enum Test {
      None = 0,
      A = 1 << 0,
      B = 1 << 1,
    }

    const flags_a = mergeFlags(Test.A, Test.B);
    const flags_b = onFlag(Test.A, Test.B);

    expect(flags_a).toBe(flags_b);
    expect(hasFlag(flags_a, Test.A)).toBeTruthy();
    expect(hasFlag(flags_a, Test.B)).toBeTruthy();
    expect(hasFlag(offFlag(flags_a, Test.B), Test.B)).toBeFalsy();
  });
});

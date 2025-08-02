import {
  describe,
  expect,
  test,
} from '@jest/globals';
import { isIntegerLike } from '../../src/predicate/isIntegerLike';

describe('isIntegerLike', () => {
  test('isIntegerLike', () => {
    expect(isIntegerLike('1')).toBeTruthy();
    expect(isIntegerLike(1)).toBeTruthy();
    expect(isIntegerLike('0')).toBeTruthy();
    expect(isIntegerLike(0)).toBeTruthy();
    expect(isIntegerLike('-1')).toBeTruthy();
    expect(isIntegerLike(-1)).toBeTruthy();
    expect(isIntegerLike('0x123')).toBeTruthy();
    expect(isIntegerLike(0x123)).toBeTruthy();
    expect(isIntegerLike('123E+10')).toBeTruthy();
    expect(isIntegerLike(123E+10)).toBeTruthy();
    expect(isIntegerLike('123.123e+10')).toBeTruthy();
    expect(isIntegerLike(123.123e+10)).toBeTruthy();

    expect(isIntegerLike('123.123')).toBeFalsy();
    expect(isIntegerLike(123.123)).toBeFalsy();
    expect(isIntegerLike(123.123E+1)).toBeFalsy();
    expect(isIntegerLike('123.123e+1')).toBeFalsy();
    expect(isIntegerLike(123n)).toBeFalsy();
    expect(isIntegerLike(Infinity)).toBeFalsy();
    expect(isIntegerLike(+Infinity)).toBeFalsy();
    expect(isIntegerLike(-Infinity)).toBeFalsy();
    expect(isIntegerLike(NaN)).toBeFalsy();
    expect(isIntegerLike('')).toBeFalsy();
    expect(isIntegerLike('123abc')).toBeFalsy();
    expect(isIntegerLike('abc123')).toBeFalsy();
    expect(isIntegerLike({})).toBeFalsy();
  });
});

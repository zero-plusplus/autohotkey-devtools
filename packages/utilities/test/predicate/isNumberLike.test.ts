import {
  describe,
  expect,
  test,
} from '@jest/globals';
import { isNumberLike } from '../../src/predicate/isNumberLike';

describe('isNumberLike', () => {
  test('isNumberLike', () => {
    expect(isNumberLike('1')).toBeTruthy();
    expect(isNumberLike(1)).toBeTruthy();
    expect(isNumberLike('0')).toBeTruthy();
    expect(isNumberLike(0)).toBeTruthy();
    expect(isNumberLike('-1')).toBeTruthy();
    expect(isNumberLike(-1)).toBeTruthy();
    expect(isNumberLike('123.123')).toBeTruthy();
    expect(isNumberLike(123.123)).toBeTruthy();
    expect(isNumberLike('0x123')).toBeTruthy();
    expect(isNumberLike(0x123)).toBeTruthy();
    expect(isNumberLike('123E+10')).toBeTruthy();
    expect(isNumberLike(123E+10)).toBeTruthy();
    expect(isNumberLike('123.123e+10')).toBeTruthy();
    expect(isNumberLike(123.123e+10)).toBeTruthy();
    expect(isNumberLike(123n)).toBeTruthy();

    expect(isNumberLike(Infinity)).toBeFalsy();
    expect(isNumberLike(+Infinity)).toBeFalsy();
    expect(isNumberLike(-Infinity)).toBeFalsy();
    expect(isNumberLike(NaN)).toBeFalsy();
    expect(isNumberLike('')).toBeFalsy();
    expect(isNumberLike('123abc')).toBeFalsy();
    expect(isNumberLike('abc123')).toBeFalsy();
    expect(isNumberLike({})).toBeFalsy();
  });
});

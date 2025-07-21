import {
  describe,
  test,
} from '@jest/globals';
import { isFileSync } from '../../src';

describe('isFileSync', () => {
  test('isFileSync', () => {
    expect(isFileSync(__filename)).toBeTruthy();
    expect(isFileSync(__dirname)).toBeFalsy();
  });
});

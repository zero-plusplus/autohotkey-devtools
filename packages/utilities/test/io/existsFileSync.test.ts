import {
  describe,
  test,
} from '@jest/globals';
import { existsFileSync } from '../../src';

describe('existsFileSync', () => {
  test('existsFileSync', () => {
    expect(existsFileSync(__filename)).toBeTruthy();
    expect(existsFileSync(__dirname)).toBeFalsy();
  });
});

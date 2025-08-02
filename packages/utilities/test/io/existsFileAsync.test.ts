import {
  describe,
  test,
} from '@jest/globals';
import { existsFileAsync } from '../../src';

describe('existsFileAsync', () => {
  test('existsFileAsync', async() => {
    await expect(existsFileAsync(__filename)).resolves.toBeTruthy();
    await expect(existsFileAsync(__dirname)).resolves.toBeFalsy();
  });
});

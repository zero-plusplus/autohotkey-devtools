import {
  describe,
  test,
} from '@jest/globals';
import { isFileAsync } from '../../src';

describe('isFileAsync', () => {
  test('isFileAsync', async() => {
    await expect(isFileAsync(__filename)).resolves.toBeTruthy();
    await expect(isFileAsync(__dirname)).resolves.toBeFalsy();
  });
});

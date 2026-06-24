import { existsFileAsync } from '../../src';

describe('existsFileAsync', () => {
  test('existsFileAsync', async() => {
    await expect(existsFileAsync(import.meta.filename)).resolves.toBeTruthy();
    await expect(existsFileAsync(import.meta.dirname)).resolves.toBeFalsy();
  });
});

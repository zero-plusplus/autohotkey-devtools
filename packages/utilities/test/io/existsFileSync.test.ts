import { existsFileSync } from '../../src';

describe('existsFileSync', () => {
  test('existsFileSync', () => {
    expect(existsFileSync(import.meta.filename)).toBeTruthy();
    expect(existsFileSync(import.meta.dirname)).toBeFalsy();
  });
});

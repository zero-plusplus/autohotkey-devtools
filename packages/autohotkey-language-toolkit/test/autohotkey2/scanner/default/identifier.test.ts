import { scannerModeMapForAhk2 } from '../../../../src/autohotkey2';
import { Scanner } from '../../../../src/core/scanner';

describe('identifier', () => {
  const scanner = new Scanner(scannerModeMapForAhk2);

  test.each([
    'abc',
    'a0123',
  ])('pass', (text) => {
    scanner.initialize(text);
    const token = scanner.scan('default');

    expect(token!.text).toBe(text);
  });

  test.each([
    '&0123abc',
  ])('fail', (text) => {
    scanner.initialize(text);
    const token = scanner.scan('default');

    expect(token).not.toBe(text);
  });

  test.each([
    'abc&',
    '_@#$',
    'a'.repeat(254),
  ])('fail', (text) => {
    scanner.initialize(text);
    const token = scanner.scan('default');

    expect(token!.text).not.toBe(text);
  });
});

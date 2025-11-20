import { defaultScanModeForAhk2 } from '../../../../src/autohotkey2/scanner/default';
import { Scanner } from '../../../../src/core/scanner';

describe('identifier', () => {
  const scanner = new Scanner('', defaultScanModeForAhk2);

  test.each([
    'abc',
    'a0123',
  ])('pass', (text) => {
    scanner.initialize(text);
    const token = scanner.scan();

    expect(token!.text).toBe(text);
  });

  test.each([
    '&0123abc',
  ])('fail', (text) => {
    scanner.initialize(text);
    const token = scanner.scan();

    expect(token).not.toBe(text);
  });

  test.each([
    'abc&',
    '_@#$',
    'a'.repeat(254),
  ])('fail', (text) => {
    scanner.initialize(text);
    const token = scanner.scan();

    expect(token!.text).not.toBe(text);
  });
});

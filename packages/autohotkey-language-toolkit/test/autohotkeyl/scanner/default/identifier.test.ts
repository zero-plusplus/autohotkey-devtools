import { defaultScanModeForAhkl } from '../../../../src/autohotkeyl/scanner/default';
import { Scanner } from '../../../../src/core/scanner';

describe('default', () => {
  const scanner = new Scanner('', defaultScanModeForAhkl);

  test.each([
    'abc',
    '_@#$',
    'a0123',
    '0',
    '123',
    '0123',
    '0123abc',
    '0xAZ',
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

    expect(token?.text).not.toBe(text);
  });

  test.each([
    'abc&',
    'a'.repeat(254),
  ])('fail', (text) => {
    scanner.initialize(text);
    const token = scanner.scan();

    expect(token?.text).not.toBe(text);
  });
});

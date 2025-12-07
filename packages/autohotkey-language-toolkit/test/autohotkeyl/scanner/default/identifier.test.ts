import { tokenScanModeProfiles } from '../../../../src/autohotkeyl';
import { createTokenScanner } from '../../../../src/core/scanner';

describe('default', () => {
  const scanner = createTokenScanner({ modeProfiles: tokenScanModeProfiles });

  test.each([
    'abc',
    '_@#$',
    'a0123',
    '0',
    '123',
    '0123',
    '0123abc',
    '0xAZ',
  ])('pass', (source) => {
    scanner.initialize({ source });
    const token = scanner.scan();

    expect(token!.text).toBe(source);
  });

  test.each([
    '&0123abc',
  ])('fail', (source) => {
    scanner.initialize({ source });
    const token = scanner.scan();

    expect(token?.text).not.toBe(source);
  });

  test.each([
    'abc&',
    'a'.repeat(254),
  ])('fail', (source) => {
    scanner.initialize({ source });
    const token = scanner.scan();

    expect(token?.text).not.toBe(source);
  });
});

import { scannerModeProfiles } from '../../../../src/autohotkey2';
import { createTokenScanner } from '../../../../src/core/scanner';

describe('identifier', () => {
  const scanner = createTokenScanner({ modeProfiles: scannerModeProfiles });

  test.each([
    'abc',
    'a0123',
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

    expect(token).not.toBe(source);
  });

  test.each([
    'abc&',
    '_@#$',
    'a'.repeat(254),
  ])('fail', (source) => {
    scanner.initialize({ source });
    const token = scanner.scan();

    expect(token!.text).not.toBe(source);
  });
});

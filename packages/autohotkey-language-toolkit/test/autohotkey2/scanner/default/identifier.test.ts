import { tokenScanModeProfiles } from '../../../../src/autohotkey2';
import { createTokenScanner } from '../../../../src/core/scanner';
import { TokenKind } from '../../../../src/core/scanner/constants';

describe('identifier', () => {
  const scanner = createTokenScanner({ modeProfiles: tokenScanModeProfiles });

  describe('identifier', () => {
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

  test.each([
    [ 'if', TokenKind.IfKeyword ],
  ])('keywords', (source, kind) => {
    scanner.initialize({ source });
    const token = scanner.scan();

    expect(token!.kind).toBe(kind);
    expect(token!.text).toBe(source);
  });

  test.each([
    [ '#ClipboardTimeout', TokenKind.DirectiveName ],
  ])('directives', (source, kind) => {
    scanner.initialize({ source });
    const token = scanner.scan();

    expect(token!.kind).toBe(kind);
    expect(token!.text).toBe(source);
  });
});

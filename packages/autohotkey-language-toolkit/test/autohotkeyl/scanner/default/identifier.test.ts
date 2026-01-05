import { tokenScanModeProfiles } from '../../../../src/autohotkeyl';
import { createTokenScanner } from '../../../../src/core/scanner';
import { TokenKind } from '../../../../src/core/scanner/constants';

describe('default', () => {
  const scanner = createTokenScanner({ modeProfiles: tokenScanModeProfiles });

  describe('identifier', () => {
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

  test.each([
    [ 'if', TokenKind.IfKeyword ],
  ])('keywords', (source, kind) => {
    scanner.initialize({ source });
    const token = scanner.scan();

    expect(token!.kind).toBe(kind);
    expect(token!.text).toBe(source);
  });

  test.each([
    [ 'AutoTrim', TokenKind.CommandName ],
  ])('directives', (source, kind) => {
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

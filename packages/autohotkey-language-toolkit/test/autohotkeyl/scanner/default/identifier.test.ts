import { TokenKinds } from '../../../../src/autohotkeyl/constants';
import { spec } from '../../../../src/autohotkeyl/scanner';
import { createScanner } from '../../../../src/core/scanner';

describe('default', () => {
  const scanner = createScanner(spec);

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
      scanner.initialize(source);
      const token = scanner.scan();

      expect(token.text).toBe(source);
    });

    test.each([
      '&0123abc',
    ])('fail', (source) => {
      scanner.initialize(source);
      const token = scanner.scan();

      expect(token.text).not.toBe(source);
    });

    test.each([
      'abc&',
      'a'.repeat(254),
    ])('fail', (source) => {
      scanner.initialize(source);
      const token = scanner.scan();

      expect(token.text).not.toBe(source);
    });
  });

  test.each([
    [ 'if', TokenKinds.Identifier ],
  ])('keywords', (source, kind) => {
    scanner.initialize(source);
    const token = scanner.scan();

    expect(token.kind).toBe(kind);
    expect(token.text).toBe(source);
  });

  test.each([
    [ 'AutoTrim', TokenKinds.Identifier ],
  ])('directives', (source, kind) => {
    scanner.initialize(source);
    const token = scanner.scan();

    expect(token.kind).toBe(kind);
    expect(token.text).toBe(source);
  });

  test.each([
    [ '#ClipboardTimeout', TokenKinds.Identifier ],
  ])('directives', (source, kind) => {
    scanner.initialize(source);
    const token = scanner.scan();

    expect(token.kind).toBe(kind);
    expect(token.text).toBe(source);
  });
});

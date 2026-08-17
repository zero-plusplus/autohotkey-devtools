import {
  createSyntaxTokenStream,
  TokenKinds,
} from '../../../../src/core';
import { spec } from '../../../../src/languages/autohotkeyl';

describe('default', () => {
  const stream = createSyntaxTokenStream(spec);

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
      stream.initialize(source);
      const token = stream.read();

      expect(token.text).toBe(source);
    });

    test.each([
      '&0123abc',
    ])('fail', (source) => {
      stream.initialize(source);
      const token = stream.read();

      expect(token.text).not.toBe(source);
    });

    test.each([
      'abc&',
      'a'.repeat(254),
    ])('fail', (source) => {
      stream.initialize(source);
      const token = stream.read();

      expect(token.text).not.toBe(source);
    });
  });

  test.each([
    [ 'if', TokenKinds.Identifier ],
  ])('keywords', (source, kind) => {
    stream.initialize(source);
    const token = stream.read();

    expect(token.kind).toBe(kind);
    expect(token.text).toBe(source);
  });

  test.each([
    [ 'AutoTrim', TokenKinds.Identifier ],
  ])('directives', (source, kind) => {
    stream.initialize(source);
    const token = stream.read();

    expect(token.kind).toBe(kind);
    expect(token.text).toBe(source);
  });

  test.each([
    [ '#ClipboardTimeout', TokenKinds.Identifier ],
  ])('directives', (source, kind) => {
    stream.initialize(source);
    const token = stream.read();

    expect(token.kind).toBe(kind);
    expect(token.text).toBe(source);
  });
});

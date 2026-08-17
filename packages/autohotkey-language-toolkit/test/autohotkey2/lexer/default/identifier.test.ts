import { createSyntaxTokenStream } from '../../../../src/core';
import { spec } from '../../../../src/languages/autohotkey2';

describe('identifier', () => {
  const stream = createSyntaxTokenStream(spec);

  describe('identifier', () => {
    test.each([
      'abc',
      'a0123',
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

      expect(token).not.toBe(source);
    });

    test.each([
      'abc&',
      '_@#$',
      'a'.repeat(254),
    ])('fail', (source) => {
      stream.initialize(source);
      const token = stream.read();

      expect(token.text).not.toBe(source);
    });
  });
});

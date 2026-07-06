import { spec } from '../../../../src/autohotkey2/reader';
import { createSyntaxTokenStream } from '../../../../src/core/reader';

describe('identifier', () => {
  const scanner = createSyntaxTokenStream(spec);

  describe('identifier', () => {
    test.each([
      'abc',
      'a0123',
    ])('pass', (source) => {
      scanner.initialize(source);
      const token = scanner.read();

      expect(token.text).toBe(source);
    });

    test.each([
      '&0123abc',
    ])('fail', (source) => {
      scanner.initialize(source);
      const token = scanner.read();

      expect(token).not.toBe(source);
    });

    test.each([
      'abc&',
      '_@#$',
      'a'.repeat(254),
    ])('fail', (source) => {
      scanner.initialize(source);
      const token = scanner.read();

      expect(token.text).not.toBe(source);
    });
  });
});

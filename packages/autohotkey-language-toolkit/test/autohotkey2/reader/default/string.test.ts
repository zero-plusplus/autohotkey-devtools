import { spec } from '../../../../src/autohotkey2/reader';
import { createSyntaxTokenStream } from '../../../../src/core/reader';

describe('string', () => {
  const scanner = createSyntaxTokenStream(spec);

  describe('double', () => {
    test.each([
      '"text"',
      '"```;`:`{`n`r`b`t`s`v`a`f`""',
    ])('pass', (source) => {
      scanner.initialize(source);
      const token = scanner.read();

      expect(token.text).toBe(source);
    });
  });

  describe('single', () => {
    test.each([
      '\'text\'',
      '\'```;`:`{`n`r`b`t`s`v`a`f}`\'\'',
    ])('pass', (source) => {
      scanner.initialize(source);
      const token = scanner.read();

      expect(token.text).toBe(source);
    });
  });
});

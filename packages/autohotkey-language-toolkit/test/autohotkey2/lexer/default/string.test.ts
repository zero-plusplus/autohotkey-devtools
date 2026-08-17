import { createSyntaxTokenStream } from '../../../../src/core';
import { spec } from '../../../../src/languages/autohotkey2';

describe('string', () => {
  const stream = createSyntaxTokenStream(spec);

  describe('double', () => {
    test.each([
      '"text"',
      '"```;`:`{`n`r`b`t`s`v`a`f`""',
    ])('pass', (source) => {
      stream.initialize(source);
      const token = stream.read();

      expect(token.text).toBe(source);
    });
  });

  describe('single', () => {
    test.each([
      '\'text\'',
      '\'```;`:`{`n`r`b`t`s`v`a`f}`\'\'',
    ])('pass', (source) => {
      stream.initialize(source);
      const token = stream.read();

      expect(token.text).toBe(source);
    });
  });
});

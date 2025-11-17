import { stringTokenRule } from '../../../src/autohotkey2/rules/string';
import { Scanner } from '../../../src/core/scanner';

describe('string', () => {
  describe('double', () => {
    test.each([
      '"text"',
      '"```;`:`{`n`r`b`t`s`v`a`f`""',
    ])('pass', (text) => {
      const scanner = new Scanner(text);
      const token = scanner.scan(stringTokenRule);

      expect(token!.kind).toBe(stringTokenRule.kind);
      expect(token!.text).toBe(text);
    });
  });

  describe('single', () => {
    test.each([
      '\'text\'',
      '\'```;`:`{`n`r`b`t`s`v`a`f}`\'\'',
    ])('pass', (text) => {
      const scanner = new Scanner(text);
      const token = scanner.scan(stringTokenRule);

      expect(token!.kind).toBe(stringTokenRule.kind);
      expect(token!.text).toBe(text);
    });
  });
});

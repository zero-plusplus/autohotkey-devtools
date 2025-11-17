import { stringTokenRule } from '../../../src/autohotkey2/rules/string';
import { Scanner } from '../../../src/core/scanner';
import { TokenKind } from '../../../src/core/scanner/constants';

describe('string', () => {
  describe('double', () => {
    test.each([
      '"text"',
      '"```;`:`{`n`r`b`t`s`v`a`f`""',
    ])('pass', (text) => {
      const scanner = new Scanner(text);
      const token = scanner.scan(stringTokenRule);

      expect(token!.kind).toBe(TokenKind.String);
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

      expect(token!.kind).toBe(TokenKind.String);
      expect(token!.text).toBe(text);
    });
  });
});

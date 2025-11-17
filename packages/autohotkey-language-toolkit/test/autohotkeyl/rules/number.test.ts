import { numberTokenRule } from '../../../src/autohotkeyl/rules/number';
import { Scanner } from '../../../src/core/scanner';
import { TokenKind } from '../../../src/core/scanner/constants';

describe('number', () => {
  test.each([
    '123abc',
  ])('identifier', (text) => {
    const scanner = new Scanner(text);
    const token = scanner.scan(numberTokenRule);

    expect(token!.kind).toBe(TokenKind.Identifier);
    expect(token!.text).toBe(text);
  });
});

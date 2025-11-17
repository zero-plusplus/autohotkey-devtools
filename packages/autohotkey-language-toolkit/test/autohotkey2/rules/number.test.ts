import { numberTokenRule } from '../../../src/autohotkey2/rules/number';
import { Scanner } from '../../../src/core/scanner';
import { TokenKind } from '../../../src/core/scanner/constants';

describe('number', () => {
  test.each([
    '123',
  ])('integer', (text) => {
    const scanner = new Scanner(text);
    const token = scanner.scan(numberTokenRule);

    expect(token!.kind).toBe(TokenKind.Number);
    expect(token!.text).toBe(text);
  });
});

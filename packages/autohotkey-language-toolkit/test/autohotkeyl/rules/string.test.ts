import { stringTokenRule } from '../../../src/autohotkeyl/rules/string';
import { Scanner } from '../../../src/core/scanner';
import { TokenKind } from '../../../src/core/scanner/constants';

describe('string', () => {
  test.each([
    '"text"',
    '"`, `% `` `; `: `:: `n `r `b `t `v `a `f """',
  ])('pass', (text) => {
    const scanner = new Scanner(text);
    const token = scanner.scan(stringTokenRule);

    expect(token!.kind).toBe(TokenKind.String);
    expect(token!.text).toBe(text);
  });
});

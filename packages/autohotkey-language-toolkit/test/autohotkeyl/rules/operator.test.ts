import { lessthanTokenRule } from '../../../src/autohotkeyl/rules/operator/lessthan';
import { Scanner } from '../../../src/core/scanner';

describe('operator', () => {
  test.each([
    [ lessthanTokenRule, '<' ],
  ])('pass', (tokenRule, tokenText) => {
    const scanner = new Scanner(tokenText);
    const token = scanner.scan(tokenRule);

    expect(token!.kind).toBe(tokenRule.kind);
    expect(token!.text).toBe(tokenText);
  });

  test.each([
    [ lessthanTokenRule, [ '<<', '<>', '<=' ] ],
  ])('fail', (tokenRule, tokenTexts) => {
    tokenTexts.forEach((tokenText) => {
      const scanner = new Scanner(tokenText);
      const token = scanner.scan(tokenRule);

      expect(token).toBeUndefined();
    });
  });
});

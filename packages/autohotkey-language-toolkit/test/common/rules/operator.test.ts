import { dotTokenRule } from '../../../src/common/rules/operator/dot';
import { minusMinusTokenRule } from '../../../src/common/rules/operator/minusminus';
import { percentTokenRule } from '../../../src/common/rules/operator/percent';
import { plusPlusTokenRule } from '../../../src/common/rules/operator/plusplus';
import { Scanner } from '../../../src/core/scanner';

describe('operator', () => {
  test.each([
    [ dotTokenRule, '.' ],
    [ minusMinusTokenRule, '--' ],
    [ percentTokenRule, '%' ],
    [ plusPlusTokenRule, '++' ],
  ])('operators', (tokenRule, tokenText) => {
    const scanner = new Scanner(tokenText);
    const token = scanner.scan(tokenRule);

    expect(token!.kind).toBe(tokenRule.kind);
    expect(token!.text).toBe(tokenText);
  });
});

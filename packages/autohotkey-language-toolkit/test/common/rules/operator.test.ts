import { asteriskAsteriskTokenRule } from '../../../src/common/rules/operator/asteriskasterisk';
import { dotTokenRule } from '../../../src/common/rules/operator/dot';
import { minusTokenRule } from '../../../src/common/rules/operator/minus';
import { minusMinusTokenRule } from '../../../src/common/rules/operator/minusminus';
import { percentTokenRule } from '../../../src/common/rules/operator/percent';
import { plusPlusTokenRule } from '../../../src/common/rules/operator/plusplus';
import { Scanner } from '../../../src/core/scanner';

describe('operator', () => {
  test.each([
    [ asteriskAsteriskTokenRule, '**' ],
    [ dotTokenRule, '.' ],
    [ minusTokenRule, '-' ],
    [ minusMinusTokenRule, '--' ],
    [ percentTokenRule, '%' ],
    [ plusPlusTokenRule, '++' ],
  ])('pass', (tokenRule, tokenText) => {
    const scanner = new Scanner(tokenText);
    const token = scanner.scan(tokenRule);

    expect(token!.kind).toBe(tokenRule.kind);
    expect(token!.text).toBe(tokenText);
  });

  test.each([
    [ minusTokenRule, [ '-=', '--' ] ],
  ])('fail', (tokenRule, tokenTexts) => {
    tokenTexts.forEach((tokenText) => {
      const scanner = new Scanner(tokenText);
      const token = scanner.scan(tokenRule);

      expect(token).toBeUndefined();
    });
  });
});

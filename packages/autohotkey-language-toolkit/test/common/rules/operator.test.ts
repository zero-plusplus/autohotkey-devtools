import { ampersandTokenRule } from '../../../src/common/rules/operator/ampersand';
import { asteriskAsteriskTokenRule } from '../../../src/common/rules/operator/asteriskasterisk';
import { dotTokenRule } from '../../../src/common/rules/operator/dot';
import { exclamationTokenRule } from '../../../src/common/rules/operator/exclamation';
import { greaterthanTokenRule } from '../../../src/common/rules/operator/greaterthan';
import { minusTokenRule } from '../../../src/common/rules/operator/minus';
import { minusMinusTokenRule } from '../../../src/common/rules/operator/minusminus';
import { percentTokenRule } from '../../../src/common/rules/operator/percent';
import { plusPlusTokenRule } from '../../../src/common/rules/operator/plusplus';
import { tildeTokenRule } from '../../../src/common/rules/operator/tilde';
import { Scanner } from '../../../src/core/scanner';

describe('operator', () => {
  test.each([
    [ ampersandTokenRule, '&' ],
    [ asteriskAsteriskTokenRule, '**' ],
    [ dotTokenRule, '.' ],
    [ exclamationTokenRule, '!' ],
    [ greaterthanTokenRule, '>' ],
    [ minusTokenRule, '-' ],
    [ minusMinusTokenRule, '--' ],
    [ percentTokenRule, '%' ],
    [ plusPlusTokenRule, '++' ],
    [ tildeTokenRule, '~' ],
  ])('pass', (tokenRule, tokenText) => {
    const scanner = new Scanner(tokenText);
    const token = scanner.scan(tokenRule);

    expect(token!.kind).toBe(tokenRule.kind);
    expect(token!.text).toBe(tokenText);
  });

  test.each([
    [ ampersandTokenRule, [ '&&', '&=' ] ],
    [ dotTokenRule, [ '.=' ] ],
    [ exclamationTokenRule, [ '!=', '!==' ] ],
    [ greaterthanTokenRule, [ '>=', '>>' ] ],
    [ minusTokenRule, [ '-=', '--' ] ],
    [ tildeTokenRule, [ '~=' ] ],
  ])('fail', (tokenRule, tokenTexts) => {
    tokenTexts.forEach((tokenText) => {
      const scanner = new Scanner(tokenText);
      const token = scanner.scan(tokenRule);

      expect(token).toBeUndefined();
    });
  });
});

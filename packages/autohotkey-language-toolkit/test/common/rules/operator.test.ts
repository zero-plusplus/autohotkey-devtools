import { ampersandTokenRule } from '../../../src/common/rules/operator/ampersand';
import { asteriskTokenRule } from '../../../src/common/rules/operator/asterisk';
import { asteriskAsteriskTokenRule } from '../../../src/common/rules/operator/asteriskasterisk';
import { dotTokenRule } from '../../../src/common/rules/operator/dot';
import { exclamationTokenRule } from '../../../src/common/rules/operator/exclamation';
import { greaterthanTokenRule } from '../../../src/common/rules/operator/greaterthan';
import { lessthanTokenRule } from '../../../src/common/rules/operator/lessthan';
import { minusTokenRule } from '../../../src/common/rules/operator/minus';
import { minusMinusTokenRule } from '../../../src/common/rules/operator/minusminus';
import { percentTokenRule } from '../../../src/common/rules/operator/percent';
import { plusTokenRule } from '../../../src/common/rules/operator/plus';
import { plusPlusTokenRule } from '../../../src/common/rules/operator/plusplus';
import { slashTokenRule } from '../../../src/common/rules/operator/slash';
import { slashSlashTokenRule } from '../../../src/common/rules/operator/slashslash';
import { tildeTokenRule } from '../../../src/common/rules/operator/tilde';
import { Scanner } from '../../../src/core/scanner';

describe('operator', () => {
  test.each([
    [ ampersandTokenRule, '&' ],
    [ asteriskTokenRule, '*' ],
    [ asteriskAsteriskTokenRule, '**' ],
    [ dotTokenRule, '.' ],
    [ exclamationTokenRule, '!' ],
    [ greaterthanTokenRule, '>' ],
    [ lessthanTokenRule, '<' ],
    [ minusTokenRule, '-' ],
    [ minusMinusTokenRule, '--' ],
    [ percentTokenRule, '%' ],
    [ plusTokenRule, '+' ],
    [ plusPlusTokenRule, '++' ],
    [ slashTokenRule, '/' ],
    [ slashSlashTokenRule, '//' ],
    [ tildeTokenRule, '~' ],
  ])('pass', (tokenRule, tokenText) => {
    const scanner = new Scanner(tokenText);
    const token = scanner.scan(tokenRule);

    expect(token!.kind).toBe(tokenRule.kind);
    expect(token!.text).toBe(tokenText);
  });

  test.each([
    [ ampersandTokenRule, [ '&&', '&=' ] ],
    [ asteriskTokenRule, [ '**', '*=' ] ],
    [ dotTokenRule, [ '.=' ] ],
    [ exclamationTokenRule, [ '!=', '!==' ] ],
    [ greaterthanTokenRule, [ '>>', '>=' ] ],
    [ lessthanTokenRule, [ '<<', '<=' ] ],
    [ minusTokenRule, [ '--', '-=' ] ],
    [ plusTokenRule, [ '++', '+=' ] ],
    [ slashTokenRule, [ '//', '/=' ] ],
    [ slashSlashTokenRule, [ '//=' ] ],
    [ tildeTokenRule, [ '~=' ] ],
  ])('fail', (tokenRule, tokenTexts) => {
    tokenTexts.forEach((tokenText) => {
      const scanner = new Scanner(tokenText);
      const token = scanner.scan(tokenRule);

      expect(token).toBeUndefined();
    });
  });
});

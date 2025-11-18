import {
  ampersandTokenRule,
  asteriskAsteriskTokenRule,
  asteriskTokenRule,
  caretTokenRule,
  dotTokenRule,
  exclamationTokenRule,
  greaterthanGreaterthanGreaterthanTokenRule,
  greaterthanGreaterthanTokenRule,
  greaterthanTokenRule,
  lessthanLessthanTokenRule,
  lessthanTokenRule,
  minusMinusTokenRule,
  minusTokenRule,
  percentTokenRule,
  pipeTokenRule,
  plusPlusTokenRule,
  plusTokenRule,
  slashSlashTokenRule,
  slashTokenRule,
  tildeEqualsTokenRule,
  tildeTokenRule,
} from '../../../src/common/rules/operator';
import { Scanner } from '../../../src/core/scanner';

describe('operator', () => {
  test.each([
    [ ampersandTokenRule, '&' ],
    [ asteriskTokenRule, '*' ],
    [ asteriskAsteriskTokenRule, '**' ],
    [ caretTokenRule, '^' ],
    [ dotTokenRule, '.' ],
    [ exclamationTokenRule, '!' ],
    [ greaterthanTokenRule, '>' ],
    [ greaterthanGreaterthanTokenRule, '>>' ],
    [ greaterthanGreaterthanGreaterthanTokenRule, '>>>' ],
    [ lessthanTokenRule, '<' ],
    [ lessthanLessthanTokenRule, '<<' ],
    [ minusTokenRule, '-' ],
    [ minusMinusTokenRule, '--' ],
    [ percentTokenRule, '%' ],
    [ pipeTokenRule, '|' ],
    [ plusTokenRule, '+' ],
    [ plusPlusTokenRule, '++' ],
    [ slashTokenRule, '/' ],
    [ slashSlashTokenRule, '//' ],
    [ tildeTokenRule, '~' ],
    [ tildeEqualsTokenRule, '~=' ],
  ])('pass', (tokenRule, tokenText) => {
    const scanner = new Scanner(tokenText);
    const token = scanner.scan(tokenRule);

    expect(token!.kind).toBe(tokenRule.kind);
    expect(token!.text).toBe(tokenText);
  });

  test.each([
    [ ampersandTokenRule, [ '&&', '&=' ] ],
    [ asteriskTokenRule, [ '**', '*=' ] ],
    [ caretTokenRule, [ '^=' ] ],
    [ dotTokenRule, [ '.=' ] ],
    [ exclamationTokenRule, [ '!=', '!==' ] ],
    [ greaterthanTokenRule, [ '>>', '>=' ] ],
    [ greaterthanGreaterthanTokenRule, [ '>>>', '>>=' ] ],
    [ greaterthanGreaterthanGreaterthanTokenRule, [ '>>>=' ] ],
    [ lessthanTokenRule, [ '<<', '<=' ] ],
    [ lessthanLessthanTokenRule, [ '>>', '>=' ] ],
    [ minusTokenRule, [ '--', '-=' ] ],
    [ pipeTokenRule, [ '||', '|=' ] ],
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

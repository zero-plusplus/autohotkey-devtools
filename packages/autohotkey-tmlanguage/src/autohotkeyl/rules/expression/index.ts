import { Repository, RuleName } from '../../../constants';
import { capture, char, escapeOnigurumaTexts, negativeLookbehind, ordalt, seq } from '../../../oniguruma';
import type { BeginEndRule, MatchRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule } from '../../../utils';

export * from './access';
export * from './array';
export * from './number';
export * from './object';
export * from './string';
export * from './variable';

export function createParenthesizedExpressionRule(scopeName: ScopeName): BeginEndRule {
  return {
    begin: capture(char('(')),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.OpenParen),
    },
    end: capture(char(')')),
    endCaptures: {
      1: nameRule(scopeName, RuleName.CloseParen),
    },
    patterns: [ includeRule(Repository.Expression) ],
  };
}
export function createSeparatorRule(scopeName: ScopeName, separator: ','): MatchRule {
  return {
    name: name(scopeName, RuleName.Comma),
    match: seq(negativeLookbehind(char('`')), char(separator)),
  };
}
export function createOperatorRule(scopeName: ScopeName, operators: readonly string[]): MatchRule {
  return {
    name: name(scopeName, RuleName.Operator),
    match: ordalt(...escapeOnigurumaTexts(operators)),
  };
}

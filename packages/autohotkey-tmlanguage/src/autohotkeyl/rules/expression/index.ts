import { Repository, RuleName } from '../../../constants';
import { capture, char, escapeOnigurumaTexts, negativeLookbehind, ordalt, seq } from '../../../oniguruma';
import type { BeginEndRule, MatchRule, PatternsRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';

export * from './access';
export * from './number';
export * from './string';
export * from './variable';

export function createExpressionRule(): PatternsRule {
  return patternsRule(
    includeRule(Repository.Comma),

    includeRule(Repository.ParenthesizedExpression),
    includeRule(Repository.Literal),
    includeRule(Repository.BuiltInVariable),
    includeRule(Repository.InvalidVariable),
    includeRule(Repository.Variable),
    includeRule(Repository.InvalidDereference),
    includeRule(Repository.Dereference),

    includeRule(Repository.Operator),
  );
}
export function createParenthesizedExpressionRule(scopeName: ScopeName): BeginEndRule {
  return {
    name: name(scopeName, Repository.ParenthesizedExpression),
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
    name: name(scopeName, RuleName.Separator),
    match: seq(negativeLookbehind(char('`')), char(separator)),
  };
}
export function createOperatorRule(scopeName: ScopeName, operators: readonly string[]): MatchRule {
  return {
    name: name(scopeName, RuleName.Operator),
    match: ordalt(...escapeOnigurumaTexts(operators)),
  };
}

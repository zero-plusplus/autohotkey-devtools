import { Repository, RuleName } from '../../../constants';
import { capture, char } from '../../../oniguruma';
import type { BeginEndRule, PatternsRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule } from '../../../utils';

export * from './access';

export function createExpressionRule(): PatternsRule {
  return {
    patterns: [
      includeRule(Repository.Comma),

      includeRule(Repository.ParenthesizedExpression),
      includeRule(Repository.Literal),
      includeRule(Repository.BuiltInVariable),
      includeRule(Repository.InvalidVariable),
      includeRule(Repository.Variable),
      includeRule(Repository.InvalidDereference),
      includeRule(Repository.Dereference),
    ],
  };
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

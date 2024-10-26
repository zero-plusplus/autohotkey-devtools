import { Repository, RuleName } from '../../../constants';
import { capture, char } from '../../../oniguruma';
import type { BeginEndRule, PatternsRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';

export * from './access';
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

import { Repository, RuleName } from '../../../constants';
import { capture, char } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule } from '../../../utils';

export * from './access';

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

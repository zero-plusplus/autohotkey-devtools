import {
  capture,
  char,
} from '../../../oniguruma.ts';
import {
  includeRule,
  nameRule,
  Repository,
  RuleName,
  type BeginEndRule,
  type ScopeName,
} from '../../../tmlanguage.ts';

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
    patterns: [
      includeRule(Repository.Trivias),

      includeRule(Repository.Comma),
      includeRule(Repository.ExpressionInBrackets),
    ],
  };
}

import { capture, char } from '../../../oniguruma';
import {
  includeRule, nameRule, Repository, RuleName,
  type BeginEndRule, type ScopeName,
} from '../../../tmlanguage';

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
      includeRule(Repository.Comment),

      includeRule(Repository.Comma),
      includeRule(Repository.ExpressionInBrackets),
    ],
  };
}

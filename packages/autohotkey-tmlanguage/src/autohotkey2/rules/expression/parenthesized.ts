import { Repository, RuleName } from '../../../constants';
import { capture, char } from '../../../oniguruma';
import { includeRule, nameRule } from '../../../tmlanguage';
import type { BeginEndRule, ScopeName } from '../../../types';

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
      includeRule(Repository.Comma),
      includeRule(Repository.ExpressionInBrackets),
    ],
  };
}

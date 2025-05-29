import { Repository, RuleName } from '../../../constants';
import { capture, char } from '../../../oniguruma';
import { includeRule, nameRule } from '../../../tmlanguage';
import type { BeginEndRule, ScopeName } from '../../../types';

export function createArrayRule(scopeName: ScopeName): BeginEndRule {
  return {
    begin: capture(char('[')),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.OpenBracket),
    },
    end: capture(char(']')),
    endCaptures: {
      1: nameRule(scopeName, RuleName.CloseBracket),
    },
    patterns: [
      includeRule(Repository.Meta),

      includeRule(Repository.Comma),
      includeRule(Repository.ExpressionInBrackets),
    ],
  };
}

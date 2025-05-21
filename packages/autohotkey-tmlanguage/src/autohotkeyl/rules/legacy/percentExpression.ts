import { Repository, RuleName } from '../../../constants';
import { capture, char, inlineSpaces1, seq } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  expressionPattern: string;
}
export function createPercentExpressionRule(scopeName: ScopeName, placholder: Placeholder): MatchRule {
  return {
    match: seq(
      capture(char('%')),
      inlineSpaces1(),
      capture(placholder.expressionPattern),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.PercentExpressionBegin),
      2: patternsRule(
        includeRule(Repository.Comma),
        includeRule(Repository.Expression),
      ),
    },
  };
}

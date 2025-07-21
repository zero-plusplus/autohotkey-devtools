import {
  capture,
  char,
  inlineSpaces1,
  seq,
} from '../../../oniguruma';
import {
  includeRule,
  nameRule,
  patternsRule,
  Repository,
  RuleName,
  type MatchRule,
  type ScopeName,
} from '../../../tmlanguage';

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

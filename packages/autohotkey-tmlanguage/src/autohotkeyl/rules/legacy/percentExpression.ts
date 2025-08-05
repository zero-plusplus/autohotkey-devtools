import {
  capture,
  char,
  inlineSpace,
  inlineSpaces1,
  negChars0,
  seq,
} from '../../../oniguruma';
import {
  includeRule,
  name,
  nameRule,
  patternsRule,
  Repository,
  RuleName,
  StyleName,
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

export function createInvalidPercentExpressionRule(scopeName: ScopeName): MatchRule {
  return {
    name: name(scopeName, RuleName.PercentExpressionBegin, StyleName.Invalid),
    match: capture(seq(
      char('%'),
      inlineSpaces1(),
      negChars0(',', inlineSpace()),
    )),
  };
}

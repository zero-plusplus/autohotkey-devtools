import {
  anyChars0,
  capture,
  char,
  inlineSpace,
  negChars0,
  seq,
} from '../../../oniguruma';
import {
  includeRule,
  nameRule,
  patternsRule,
  Repository,
  RuleName,
  type MatchRule,
  type Rule,
  type ScopeName,
} from '../../../tmlanguage';

export function createDereferenceRule(scopeName: ScopeName): Rule {
  return {
    match: seq(
      capture(char('%')),
      capture(anyChars0()),
      capture(char('%')),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.PercentBegin),
      2: patternsRule(
        includeRule(Repository.Comma),
        includeRule(Repository.ExpressionInBrackets),
      ),
      3: nameRule(scopeName, RuleName.PercentEnd),
    },
  };
}
export function createDereferenceInCommandArgumentRule(scopeName: ScopeName): MatchRule {
  return {
    match: seq(
      capture(char('%')),
      capture(negChars0(inlineSpace())),
      capture(char('%')),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.PercentBegin),
      2: patternsRule(
        includeRule(Repository.Dereference),
        includeRule(Repository.Variable),
      ),
      3: nameRule(scopeName, RuleName.PercentEnd),
    },
  };
}

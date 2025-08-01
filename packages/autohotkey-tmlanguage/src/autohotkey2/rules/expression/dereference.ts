import {
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
  type BeginEndRule,
  type MatchRule,
  type ScopeName,
} from '../../../tmlanguage';

export function createDereferenceRule(scopeName: ScopeName): BeginEndRule {
  return {
    begin: capture(char('%')),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.PercentBegin),
    },
    end: capture(char('%')),
    endCaptures: {
      1: nameRule(scopeName, RuleName.PercentEnd),
    },
    patterns: [
      includeRule(Repository.Meta),

      includeRule(Repository.Comma),
      includeRule(Repository.Expression),
    ],
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

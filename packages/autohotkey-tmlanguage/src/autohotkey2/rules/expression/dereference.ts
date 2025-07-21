import {
  capture,
  char,
} from '../../../oniguruma';
import {
  includeRule,
  nameRule,
  Repository,
  RuleName,
  type BeginEndRule,
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

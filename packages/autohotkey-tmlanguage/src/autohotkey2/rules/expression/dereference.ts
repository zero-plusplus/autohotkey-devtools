import { Repository, RuleName } from '../../../constants';
import { capture, char } from '../../../oniguruma';
import { includeRule, nameRule } from '../../../tmlanguage';
import type { BeginEndRule, ScopeName } from '../../../types';

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

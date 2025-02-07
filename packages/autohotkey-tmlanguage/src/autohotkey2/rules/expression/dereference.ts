import { Repository, RuleName } from '../../../constants';
import { capture, char } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { includeRule, nameRule } from '../../../utils';

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

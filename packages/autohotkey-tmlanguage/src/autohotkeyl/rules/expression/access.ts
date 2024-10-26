import { Repository, RuleName } from '../../../constants';
import { anyChars1, capture, char, negChars1, seq } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule } from '../../../utils';

export function createDereferenceRule(scopeName: ScopeName): MatchRule {
  return {
    match: seq(
      capture(char('%')),
      capture(negChars1('\\r', '\\n')),
      capture(char('%')),
    ),
    captures: {
      1: nameRule(scopeName, Repository.Dereference, RuleName.PercentBegin),
      2: {
        patterns: [
          includeRule(Repository.InvalidDereference),
          includeRule(Repository.Dereference),
          {
            name: name(scopeName, Repository.Dereference),
            match: capture(anyChars1()),
            captures: {
              1: {
                patterns: [ includeRule(Repository.Expression) ],
              },
            },
          },
        ],
      },
      3: nameRule(scopeName, Repository.Dereference, RuleName.PercentEnd),
    },
  };
}

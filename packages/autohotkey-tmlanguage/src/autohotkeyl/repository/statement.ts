import { Repository } from '../../constants';
import type { PatternsRule, Repositories, ScopeName } from '../../types';
import { createUtilities } from '../../utils';

export function createLiteralRepositories(scopeName: ScopeName): Repositories {
  const { name, includeRule } = createUtilities(scopeName);

  return {
    [Repository.Statement]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.CommandStatement),
          includeRule(Repository.LegacyStatement),
          includeRule(Repository.ExpressionStatement),
        ],
      };
    })(),
    [Repository.LegacyStatement]: ((): PatternsRule => {
      return {
        patterns: [ includeRule(Repository.Legacy) ],
      };
    })(),
    [Repository.CommandStatement]: ((): PatternsRule => {
      return {
        name: name(Repository.CommandStatement),
        patterns: [ includeRule(Repository.Command) ],
      };
    })(),
    [Repository.ExpressionStatement]: ((): PatternsRule => {
      return {
        patterns: [ includeRule(Repository.Expression) ],
      };
    })(),
  };
}

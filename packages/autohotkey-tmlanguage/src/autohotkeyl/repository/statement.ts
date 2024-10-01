import { Repository, Repositories, PatternsRule, ScopeName } from '../../types';
import { createUtilities } from '../../utils';

export function createLiteralRepositories(scopeName: ScopeName): Repositories {
  const { includeRule } = createUtilities(scopeName);

  return {
    [Repository.Statement]: ((): PatternsRule => {
      return {
        patterns: [
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
    [Repository.ExpressionStatement]: ((): PatternsRule => {
      return {
        patterns: [ includeRule(Repository.Expression) ],
      };
    })(),
  };
}

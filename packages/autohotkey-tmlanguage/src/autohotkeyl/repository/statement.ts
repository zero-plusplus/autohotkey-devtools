import { Repository, Repositories, PatternsRule, ScopeName } from '../../types';
import { createUtilities } from '../../utils';

export function createLiteralRepositories(scopeName: ScopeName): Repositories {
  const { includeRule } = createUtilities(scopeName);

  return {
    [Repository.Statement]: ((): PatternsRule => {
      return {
        patterns: [ includeRule(Repository.ExpressionStatement) ],
      };
    })(),
    [Repository.ExpressionStatement]: ((): PatternsRule => {
      return {
        patterns: [ includeRule(Repository.Expression) ],
      };
    })(),
  };
}

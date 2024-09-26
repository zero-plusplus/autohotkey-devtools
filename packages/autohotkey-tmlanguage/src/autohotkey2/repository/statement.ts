import { Repository, Repositories, PatternsRule, ScopeName } from '../../types';
import * as ahkl from '../../autohotkeyl/repository/statement';
import { createUtilities } from '../../utils';

export function createLiteralRepositories(scopeName: ScopeName): Repositories {
  const { includeRule } = createUtilities(scopeName);
  const ahklRepositories = ahkl.createLiteralRepositories(scopeName);

  return {
    [Repository.Statement]: ((): PatternsRule => {
      return {
        patterns: [ includeRule(Repository.ExpressionStatement) ],
      };
    })(),
    [Repository.ExpressionStatement]: ahklRepositories[Repository.ExpressionStatement],
  };
}

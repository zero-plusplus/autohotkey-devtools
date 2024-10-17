import * as ahkl from '../../autohotkeyl/repository/statement';
import { Repository } from '../../constants';
import type { PatternsRule, Repositories, ScopeName } from '../../types';
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

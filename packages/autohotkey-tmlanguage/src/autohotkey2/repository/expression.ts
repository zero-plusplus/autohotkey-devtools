import { Repository, Repositories, PatternsRule, ScopeName } from '../../types';
import * as ahkl from '../../autohotkeyl/repository/expression';
import { createUtilities } from '../../utils';

export function createLiteralRepositories(scopeName: ScopeName): Repositories {
  const { includeRule } = createUtilities(scopeName);
  const ahklRepositories = ahkl.createLiteralRepositories(scopeName);

  return {
    [Repository.Expression]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.Literal),
          includeRule(Repository.InvalidVariable),
          includeRule(Repository.Variable),
        ],
      };
    })(),
    [Repository.Variable]: ahklRepositories[Repository.Variable],
    [Repository.InvalidVariable]: ahklRepositories[Repository.InvalidVariable],
  };
}

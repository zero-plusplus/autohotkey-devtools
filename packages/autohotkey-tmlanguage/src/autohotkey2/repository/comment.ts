import { Repository, Repositories, PatternsRule, ScopeName } from '../../types';
import * as ahkl from '../../autohotkeyl/repository/comment';
import { createUtilities } from '../../utils';

export function createRepositories(scopeName: ScopeName): Repositories {
  const { includeRule } = createUtilities(scopeName);
  const ahklRepositories = ahkl.createRepositories(scopeName);

  return {
    [Repository.Comment]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.SingleLineComment),
          includeRule(Repository.InLineComment),
        ],
      };
    })(),
    [Repository.SingleLineComment]: ahklRepositories[Repository.SingleLineComment],
    [Repository.InLineComment]: ahklRepositories[Repository.InLineComment],
  };
}

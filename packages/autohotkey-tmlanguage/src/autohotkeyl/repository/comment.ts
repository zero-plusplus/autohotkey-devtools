import { Repositories, PatternsRule, ScopeName, MatchRule } from '../../types';
import { RuleName, Repository } from '../../constants';
import { createUtilities, includeRule } from '../../utils';

export function createRepositories(scopeName: ScopeName): Repositories {
  const { nameRule } = createUtilities(scopeName);
  return {
    [Repository.Comment]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.SingleLineComment),
          includeRule(Repository.InLineComment),
        ],
      };
    })(),
    [Repository.SingleLineComment]: ((): MatchRule => {
      return {
        match: '(?<=^\\s*)(;.*)$',
        captures: {
          1: nameRule(RuleName.SingleLineComment),
        },
      };
    })(),
    [Repository.InLineComment]: ((): MatchRule => {
      return {
        match: '(?<=\\s)(;.*)$',
        captures: {
          1: nameRule(RuleName.InLineComment),
        },
      };
    })(),
  };
}

import { Repository, Repositories, PatternsRule, ScopeName, MatchRule, RuleName } from '../../types';
import { createUtilities } from '../../utils';

export function createLiteralRepositories(scopeName: ScopeName): Repositories {
  const { getVariableParts: getVariableParts, includeRule, nameRule } = createUtilities(scopeName);
  const variableParts = getVariableParts();

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
    [Repository.Variable]: ((): MatchRule => {
      return {
        match: `((?:${variableParts.headChar})(?:${variableParts.tailChar}){0,252})`,
        captures: {
          1: nameRule(RuleName.Variable),
        },
      };
    })(),
    [Repository.InvalidVariable]: ((): MatchRule => {
      return {
        match: `((?:${variableParts.headChar})(?:${variableParts.tailChar}){252})((?:${variableParts.tailChar})+)`,
        captures: {
          1: nameRule(RuleName.Variable),
          2: nameRule(RuleName.Variable, RuleName.InvalidVariable),
        },
      };
    })(),
  };
}

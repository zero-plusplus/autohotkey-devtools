import { Repository, Repositories, PatternsRule, ScopeName, MatchRule, RuleName } from '../../types';
import { createUtilities } from '../../utils';

export function createLiteralRepositories(scopeName: ScopeName): Repositories {
  const { getVariableParts, getBuiltInVariableNames, includeRule, nameRule } = createUtilities(scopeName);
  const variableParts = getVariableParts();
  const builtinVariables = getBuiltInVariableNames();

  return {
    [Repository.Expression]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.Literal),
          includeRule(Repository.BuiltInVariable),
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
    [Repository.InvalidVariable]: ((): PatternsRule => {
      return {
        patterns: [
          {
            match: `(\\d+)((?:${variableParts.headChar})(?:${variableParts.tailChar}){0,252})`,
            captures: {
              1: nameRule(RuleName.Variable, RuleName.Integer, RuleName.InvalidVariable),
              2: nameRule(RuleName.Variable),
            },
          },
          {
            match: `((?:${variableParts.headChar})(?:${variableParts.tailChar}){252})((?:${variableParts.tailChar})+)`,
            captures: {
              1: nameRule(RuleName.Variable),
              2: nameRule(RuleName.Variable, RuleName.InvalidVariable),
            },
          },
        ],
      };
    })(),

    // #region builtin variable
    [Repository.BuiltInVariable]: ((): MatchRule => {
      return {
        match: `(?i)(?<=\\b)(${builtinVariables.join('|')})(?=\\b)`,
        captures: {
          1: nameRule(RuleName.BuiltInVariable),
        },
      };
    })(),
    // #endregion builtin variable
  };
}

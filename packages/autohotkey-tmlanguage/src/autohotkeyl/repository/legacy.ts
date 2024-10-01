import { Repository, Repositories, PatternsRule, ScopeName, RuleName, Rule, CommandArgsType, CommandInfo, MatchRule } from '../../types';
import { createUtilities, getCommandInfos } from '../../utils';

export function createRepositories(scopeName: ScopeName): Repositories {
  const { getEscapeSequencesInfo, getExpressionBegin, getVariableParts, includeRule, name, nameRule } = createUtilities(scopeName);
  const expressionBegin = getExpressionBegin();
  const variableParts = getVariableParts();
  const escapeSequencesInfo = getEscapeSequencesInfo();

  return {
    [Repository.Legacy]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.LegacyAssignment),
        ],
      };
    })(),
    [Repository.LegacyAssignment]: ((): MatchRule => {
      return {
        match: `${expressionBegin}((?:${variableParts.headChar})(?:${variableParts.tailChar})*)\\s*(=)\\s*((?:[^\\r\\n;]|(?<!\\s);)*)(?=\\s+;|\\s*$)`,
        captures: {
          1: {
            name: name(RuleName.LegacyAssignment),
            patterns: [ includeRule(Repository.Variable) ],
          },
          2: nameRule(RuleName.LegacyAssignment, RuleName.Equals),
          3: {
            name: name(RuleName.LegacyAssignment),
            patterns: [
              includeRule(Repository.Dereference),
              includeRule(Repository.LegacyTextEscapeSequence),
              {
                name: name(RuleName.LegacyText),
                match: '((?:(?<!`)[^\\r\\n%])+)',
              },
            ],
          },
        },
      };
    })(),
    [Repository.LegacyTextEscapeSequence]: ((): MatchRule => {
      return {
        name: name(RuleName.LegacyTextEscapeSequence),
        match: escapeSequencesInfo.legacyText.join('|'),
      };
    })(),
  };
}

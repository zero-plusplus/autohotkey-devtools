import { Repository, Repositories, PatternsRule, ScopeName, RuleName, Rule, CommandArgsType, CommandInfo, MatchRule } from '../../types';
import { createUtilities, getLegacyText } from '../../utils';

export function createRepositories(scopeName: ScopeName): Repositories {
  const { getEscapeSequencesInfo, getExpressionBegin, getVariableParts, includeRule, name, nameRule } = createUtilities(scopeName);
  const legacyText = getLegacyText();
  const expressionBegin = getExpressionBegin();
  const variableParts = getVariableParts();
  const escapeSequencesInfo = getEscapeSequencesInfo();

  const brackets = '(?:\\([^\\r\\n\\)]*\\)|\\[[^\\r\\n\\]]*\\]|\\{[^\\r\\n\\}]*\\})';

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
        match: `${expressionBegin}((?:${variableParts.headChar})(?:${variableParts.tailChar})*)\\s*(=)\\s*((?:${brackets}|${legacyText}|${escapeSequencesInfo.legacyText.join('|')}|%)*)(?=\\s+(?!\`);|\\s*$)`,
        captures: {
          1: {
            name: name(RuleName.LegacyAssignment),
            patterns: [ includeRule(Repository.Variable) ],
          },
          2: nameRule(RuleName.LegacyAssignment, RuleName.Equals),
          3: {
            name: name(RuleName.LegacyAssignment),
            patterns: [
              includeRule(Repository.PercentExpression),
              includeRule(Repository.Dereference),
              includeRule(Repository.LegacyTextEscapeSequence),
              {
                name: name(RuleName.LegacyText),
                match: `(?:${legacyText})+`,
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
    [Repository.PercentExpression]: ((): MatchRule => {
      return {
        match: `(%)\\s+((?:${brackets}|[^\\r\\n,])*)`,
        captures: {
          1: nameRule(RuleName.ForceExpression, RuleName.ForceExpressionPercent),
          2: {
            name: name(RuleName.ForceExpression),
            patterns: [ includeRule(Repository.Expression) ],
          },
        },
      };
    })(),
  };
}

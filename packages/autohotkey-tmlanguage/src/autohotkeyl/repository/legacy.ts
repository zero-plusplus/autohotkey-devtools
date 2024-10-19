import { Repository, RuleName } from '../../constants';
import { alt, capture, char, endAnchor, group, groupMany0, inlineSpace, inlineSpaces0, inlineSpaces1, lookahead, many1, negativeLookahead, negativeLookbehind, negChar, negChars0, ordalt, seq } from '../../oniguruma';
import type { MatchRule, PatternsRule, Repositories, ScopeName } from '../../types';
import { createUtilities, getLegacyTextChar } from '../../utils';

export function createRepositories(scopeName: ScopeName): Repositories {
  const { getEscapeSequencesInfo, getExpressionBegin, getVariableParts, includeRule, name, nameRule } = createUtilities(scopeName);
  const legacyText = getLegacyTextChar();
  const expressionBegin = getExpressionBegin();
  const variableParts = getVariableParts();
  const escapeSequencesInfo = getEscapeSequencesInfo();

  const brackets = group(alt(
    seq(char('('), negChars0('\\r', '\\n', ')'), char(')')),
    seq(char('['), negChars0('\\r', '\\n', ']'), char(']')),
    seq(char('{'), negChars0('\\r', '\\n', '}'), char('}')),
  ));

  return {
    [Repository.Legacy]: ((): PatternsRule => {
      return {
        patterns: [ includeRule(Repository.LegacyAssignment) ],
      };
    })(),
    [Repository.LegacyAssignment]: ((): MatchRule => {
      const endLine = lookahead(alt(
        seq(inlineSpaces1(), negativeLookahead(char('`'))),
        seq(inlineSpaces0(), endAnchor()),
      ));

      return {
        match: seq(
          expressionBegin,
          capture(seq(variableParts.headChar, groupMany0(variableParts.tailChar))),
          inlineSpaces0(),
          capture(char('=')),
          inlineSpaces0(),
          capture(groupMany0(alt(
            brackets,
            legacyText,
            group(ordalt(...escapeSequencesInfo.legacyText)),
            char('%'),
          ))),
          endLine,
        ),
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
                match: many1(legacyText),
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
        match: seq(
          capture(char('%')),
          inlineSpaces1(),
          capture(groupMany0(alt(
            brackets,
            negChar('\\r', '\\n', ',', ';'),
            seq(negativeLookbehind(inlineSpace()), char(';')),
          ))),
        ),
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

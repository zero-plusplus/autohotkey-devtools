import { Repository, RuleName } from '../../constants';
import { alt, capture, char, endAnchor, group, groupMany0, inlineSpace, inlineSpaces0, inlineSpaces1, lookahead, many1, negativeLookahead, negativeLookbehind, negChar, negChars0, ordalt, seq } from '../../oniguruma';
import type { MatchRule, PatternsRule, Repositories, ScopeName } from '../../types';
import { createUtilities, getEscapeSequencesInfo, getExpressionBegin, getVariableParts } from '../../utils';

export function createRepositories(scopeName: ScopeName): Repositories {
  const { includeRule, name, nameRule } = createUtilities(scopeName);

  const expressionBegin = getExpressionBegin(scopeName);
  const variableParts = getVariableParts(scopeName);
  const escapeSequencesInfo = getEscapeSequencesInfo(scopeName);

  // #region common matchers
  const legacyText = group(alt(
    negChar('\\s', ',', '%', '`', ';', ':'),
    seq(inlineSpace(), negativeLookahead(';')),
  ));
  const brackets = group(alt(
    seq(char('('), negChars0('\\r', '\\n', ')'), char(')')),
    seq(char('['), negChars0('\\r', '\\n', ']'), char(']')),
    seq(char('{'), negChars0('\\r', '\\n', '}'), char('}')),
  ));
  // #endregion common matchers

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
            name: name(Repository.LegacyAssignment),
            patterns: [ includeRule(Repository.Variable) ],
          },
          2: nameRule(Repository.LegacyAssignment, RuleName.Equals),
          3: {
            name: name(Repository.LegacyAssignment),
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
          1: nameRule(Repository.PercentExpression, RuleName.PercentBegin),
          2: {
            name: name(Repository.PercentExpression),
            patterns: [ includeRule(Repository.Expression) ],
          },
        },
      };
    })(),
  };
}

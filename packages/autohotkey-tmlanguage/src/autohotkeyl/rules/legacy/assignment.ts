import * as patterns_common from '../../../common/patterns';
import {
  alt, capture, char, endAnchor, group, groupMany0, inlineSpaces0, inlineSpaces1, lookahead,
  lookbehind, negativeLookahead, negChars1, ordalt, seq, textalt,
} from '../../../oniguruma';
import {
  includeRule, name, nameRule, patternsRule, Repository, RuleName, StyleName,
  type MatchRule, type ScopeName,
} from '../../../tmlanguage';
import * as constants_v1 from '../../constants';

interface Placeholder {
  startPattern: string;
  leftHandPattern: string;
}
export function createLegacyAssignmentRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  const endLine = lookahead(alt(
    seq(inlineSpaces1(), negativeLookahead(char('`'))),
    seq(inlineSpaces0(), endAnchor()),
  ));

  return {
    match: seq(
      lookbehind(placeholder.startPattern),
      capture(placeholder.leftHandPattern),
      inlineSpaces0(),
      capture(char('=')),
      inlineSpaces0(),
      capture(groupMany0(alt(
        patterns_common.unquotedPairStringPattern,
        patterns_common.unquotedCharPattern,
        group(ordalt(...constants_v1.unquoteEscapeSequences)),
        char('%'),
      ))),
      endLine,
    ),
    captures: {
      1: patternsRule(
        includeRule(Repository.Comma),
        includeRule(Repository.Expression),
      ),
      2: nameRule(scopeName, RuleName.Operator),
      3: patternsRule(
        includeRule(Repository.PercentExpression),
        includeRule(Repository.Dereference),

        // escape sequences
        {
          name: name(scopeName, RuleName.UnquotedString, StyleName.Escape),
          match: textalt(...constants_v1.unquoteEscapeSequences),
        },
        {
          name: name(scopeName, RuleName.UnquotedString),
          match: negChars1('`', '%'),
        },
      ),
    },
  };
}

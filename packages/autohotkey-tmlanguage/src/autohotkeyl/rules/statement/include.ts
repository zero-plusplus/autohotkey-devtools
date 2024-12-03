import { Repository, RuleName } from '../../../constants';
import { anyChars0, capture, char, ignoreCase, inlineSpaces0, inlineSpaces1, lookahead, lookbehind, optseq, ordalt, reluctant, seq } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  endAnchor: string;
}
export function createIncludeStatementRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  const includeKeyword = ordalt(ignoreCase('#Include'), ignoreCase('#IncludeAgain'));

  return {
    name: name(scopeName, Repository.IncludeStatement),
    begin: seq(
      lookbehind(placeholder.startAnchor),
      lookahead(seq(
        inlineSpaces0(),
        includeKeyword,
      )),
    ),
    end: lookahead(placeholder.endAnchor),
    patterns: [
      {
        match: seq(
          lookbehind(placeholder.startAnchor),
          inlineSpaces0(),
          capture(includeKeyword),
          inlineSpaces0(),
          capture(char('<')),
          capture(anyChars0()),
          capture(char('>')),
        ),
        captures: {
          1: nameRule(scopeName, RuleName.DirectiveName),
          2: nameRule(scopeName, RuleName.OpenAngleBracket),
          3: patternsRule(includeRule(Repository.CommandArgumentText)),
          4: nameRule(scopeName, RuleName.CloseAngleBracket),
        },
      },
      {
        match: seq(
          lookbehind(placeholder.startAnchor),
          inlineSpaces0(),
          capture(includeKeyword),
          optseq(
            inlineSpaces1(),
            capture(reluctant(anyChars0())),
          ),
          lookahead(placeholder.endAnchor),
        ),
        captures: {
          1: nameRule(scopeName, RuleName.DirectiveName),
          2: patternsRule(includeRule(Repository.CommandArgument)),
        },
      },
    ],
  };
}

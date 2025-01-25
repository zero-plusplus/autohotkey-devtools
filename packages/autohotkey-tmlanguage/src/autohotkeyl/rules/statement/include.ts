import { Repository, RuleName } from '../../../constants';
import { alt, anyChars0, capture, char, escapeOnigurumaTexts, group, ignoreCase, inlineSpace, inlineSpaces0, inlineSpaces1, lookahead, lookbehind, negativeLookahead, optseq, ordalt, reluctant, seq } from '../../../oniguruma';
import type { PatternsRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  expressionOperators: readonly string[];
  endAnchor: string;
}
export function createIncludeStatementRule(scopeName: ScopeName, placeholder: Placeholder): PatternsRule {
  return patternsRule(
    {
      name: name(scopeName, Repository.IncludeStatement),
      match: seq(
        lookbehind(placeholder.startAnchor),
        inlineSpaces0(),
        capture(ignoreCase(ordalt('#Include', '#IncludeAgain'))),
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
      name: name(scopeName, Repository.IncludeStatement),
      begin: seq(
        lookbehind(placeholder.startAnchor),
        lookahead(seq(
          inlineSpaces0(),
          ignoreCase(ordalt('#Include', '#IncludeAgain')),
          lookahead(alt(char(','), inlineSpace())),
          group(alt(
            char(','),
            negativeLookahead(ordalt(...escapeOnigurumaTexts(placeholder.expressionOperators))),
          )),
        )),
      ),
      end: lookahead(placeholder.endAnchor),
      patterns: [
        {
          match: seq(
            lookbehind(placeholder.startAnchor),
            inlineSpaces0(),
            capture(ignoreCase(ordalt('#Include', '#IncludeAgain'))),
            optseq(
              inlineSpaces1(),
              capture(reluctant(anyChars0())),
            ),
            lookahead(placeholder.endAnchor),
          ),
          captures: {
            1: nameRule(scopeName, RuleName.DirectiveName),
            2: patternsRule(includeRule(Repository.CommandLastArgument)),
          },
        },
      ],
    },
  );
}

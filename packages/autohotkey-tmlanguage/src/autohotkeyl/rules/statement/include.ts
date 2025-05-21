import { Repository, RuleName } from '../../../constants';
import {
  anyChars0, capture, char, ignoreCase, inlineSpaces0, inlineSpaces1, lookahead, lookbehind, optseq,
  ordalt, reluctant, seq,
} from '../../../oniguruma';
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
        inlineSpaces1(),
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
          inlineSpaces1(),
        )),
      ),
      end: lookahead(placeholder.endAnchor),
      patterns: [
        {
          match: seq(
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

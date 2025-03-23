import { Repository, RuleName } from '../../../constants';
import { anyChars0, capture, escapeOnigurumaTexts, ignoreCase, inlineSpaces0, inlineSpaces1, lookahead, lookbehind, negativeLookahead, optseq, ordalt, reluctant, seq } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  expressionOperators: readonly string[];
  endAnchor: string;
}
export function createRequiresStatementRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    begin: lookahead(seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      ignoreCase('#Requires'),
      inlineSpaces1(),
      negativeLookahead(ordalt(...escapeOnigurumaTexts(placeholder.expressionOperators))),
    )),
    end: lookahead(placeholder.endAnchor),
    patterns: [
      {
        match: seq(
          lookbehind(placeholder.startAnchor),
          inlineSpaces0(),
          capture(ignoreCase('#Requires')),
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
  };
}

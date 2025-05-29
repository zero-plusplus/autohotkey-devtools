import {
  anyChars0, capture, ignoreCase, inlineSpaces0, inlineSpaces1, lookahead, lookbehind, negativeLookahead,
  optseq, reluctant, seq, textalt,
} from '../../../oniguruma';
import {
  includeRule, nameRule, patternsRule, Repository, RuleName,
  type BeginEndRule, type ScopeName,
} from '../../../tmlanguage';

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
      negativeLookahead(textalt(...placeholder.expressionOperators)),
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

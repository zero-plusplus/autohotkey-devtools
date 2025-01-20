import { RuleName } from '../../../constants';
import { alt, capture, char, escapeOnigurumaTexts, group, ignoreCase, inlineSpace, inlineSpaces0, lookbehind, negativeLookahead, ordalt, seq } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { nameRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  identifierPattern: string;
  expressionOperators: readonly string[];
}
export function createCallStatementRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      capture(ignoreCase(placeholder.identifierPattern)),
      group(alt(
        group(seq(
          inlineSpace(),
          negativeLookahead(seq(inlineSpaces0(), ordalt(...escapeOnigurumaTexts(placeholder.expressionOperators)))),
        )),
        seq(
          inlineSpaces0(),
          capture(char(',')),
        ),
      )),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.FunctionName),
      2: nameRule(scopeName, RuleName.Comma),
    },
  };
}

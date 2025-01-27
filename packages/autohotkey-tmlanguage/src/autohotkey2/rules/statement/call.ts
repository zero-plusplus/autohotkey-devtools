import { RuleName, StyleName } from '../../../constants';
import { alt, capture, char, endAnchor, escapeOnigurumaTexts, group, ignoreCase, inlineSpace, inlineSpaces0, lookbehind, negativeLookahead, ordalt, seq } from '../../../oniguruma';
import type { ElementName, MatchRule, ScopeName } from '../../../types';
import { nameRule } from '../../../utils';

type Placeholder = {
  startAnchor: string;
  commandRuleName: ElementName;
  identifierPattern: string;
  expressionOperators: readonly string[];
} | {
  startAnchor: string;
  commandRuleName: ElementName;
  names: readonly string[];
  expressionOperators: readonly string[];
  isDeprecated?: boolean;
};
export function createCallStatementRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      'identifierPattern' in placeholder
        ? capture(ignoreCase(placeholder.identifierPattern))
        : capture(ignoreCase(ordalt(...placeholder.names))),
      group(alt(
        group(seq(
          inlineSpace(),
          negativeLookahead(seq(inlineSpaces0(), ordalt(...escapeOnigurumaTexts(placeholder.expressionOperators)))),
        )),
        group(seq(
          inlineSpaces0(),
          capture(char(',')),
        )),
        endAnchor(),
      )),
    ),
    captures: {
      1: 'isDeprecated' in placeholder && placeholder.isDeprecated
        ? nameRule(scopeName, placeholder.commandRuleName, StyleName.Strikethrough)
        : nameRule(scopeName, placeholder.commandRuleName),
      2: nameRule(scopeName, RuleName.Comma),
    },
  };
}

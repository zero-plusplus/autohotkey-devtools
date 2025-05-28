import { Repository, RuleName, StyleName } from '../../../constants';
import {
  alt, capture, char, endAnchor, group, ignoreCase, inlineSpace, inlineSpaces0, inlineSpaces1,
  lookahead, lookbehind, negativeLookahead, seq, textalt,
} from '../../../oniguruma';
import type { ElementName, PatternsRule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';

type Placeholder = {
  startAnchor: string;
  commandRuleName: ElementName;
  identifierPattern: string;
  assignmentOperators: readonly string[];
  isDeprecated?: boolean;
};
export function createCallStatementRule(scopeName: ScopeName, placeholder: Placeholder): PatternsRule {
  return patternsRule(
    // No argument
    {
      match: seq(
        lookbehind(placeholder.startAnchor),
        inlineSpaces0(),
        capture(ignoreCase(placeholder.identifierPattern)),
        inlineSpaces0(),
        endAnchor(),
      ),
      captures: {
        1: placeholder.isDeprecated
          ? nameRule(scopeName, placeholder.commandRuleName, StyleName.Strikethrough)
          : nameRule(scopeName, placeholder.commandRuleName),
      },
    },
    // Rules for highlighting as an object, not a block
    {
      begin: seq(
        lookbehind(placeholder.startAnchor),
        inlineSpaces0(),
        capture(ignoreCase(placeholder.identifierPattern)),
        group(alt(
          inlineSpaces1(),
          capture(seq(inlineSpaces0(), char(','))),
        )),
        inlineSpaces0(),
        capture(char('{')),
      ),
      beginCaptures: {
        1: placeholder.isDeprecated
          ? nameRule(scopeName, placeholder.commandRuleName, StyleName.Strikethrough)
          : nameRule(scopeName, placeholder.commandRuleName),
        2: nameRule(scopeName, RuleName.Comma),
        3: nameRule(scopeName, RuleName.OpenBrace),
      },
      end: capture(char('}')),
      endCaptures: {
        1: nameRule(scopeName, RuleName.CloseBrace),
      },
      patterns: [ includeRule(Repository.ObjectContent) ],
    },
    // Otherwise
    {
      match: seq(
        lookbehind(placeholder.startAnchor),
        inlineSpaces0(),
        capture(ignoreCase(placeholder.identifierPattern)),
        group(alt(
          // Not assign (e.g. var := "")
          group(seq(
            inlineSpace(),
            negativeLookahead(seq(inlineSpaces0(), textalt(...placeholder.assignmentOperators))),
          )),
          // Explicit syntax with commas
          group(seq(
            inlineSpaces0(),
            lookahead(char('{', ',')),
          )),
        )),
      ),
      captures: {
        1: placeholder.isDeprecated
          ? nameRule(scopeName, placeholder.commandRuleName, StyleName.Strikethrough)
          : nameRule(scopeName, placeholder.commandRuleName),
      },
    },
  );
}

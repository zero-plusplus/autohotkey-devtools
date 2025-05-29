import { RuleName, StyleName } from '../../../constants';
import {
  capture, char, ignoreCase, lookahead, lookbehind, negativeLookbehind, optional, seq,
  textalt, wordBound,
} from '../../../oniguruma';
import { nameRule } from '../../../tmlanguage';
import type { MatchRule, ScopeName } from '../../../types';

interface Placeholder_IdentifierRule {
  ruleName: RuleName;
  identifierPattern: string;
  endAnchor?: string;
}
export function createIdentifierRule(scopeName: ScopeName, placeholder: Placeholder_IdentifierRule): MatchRule {
  return {
    match: seq(
      capture(placeholder.identifierPattern),
      optional(capture(placeholder.identifierPattern)),
      lookahead(placeholder.endAnchor ?? wordBound()),
    ),
    captures: {
      1: nameRule(scopeName, placeholder.ruleName),
      2: nameRule(scopeName, placeholder.ruleName, StyleName.Invalid),
    },
  };
}

interface Placeholder_BuiltIn {
  ruleName: RuleName;
  identifiers: readonly string[];
}
export function createReservedIdentifierRule(scopeName: ScopeName, placeholder: Placeholder_BuiltIn): MatchRule {
  return {
    match: seq(
      lookbehind(wordBound()),
      negativeLookbehind(char('.')),
      capture(ignoreCase(textalt(...placeholder.identifiers))),
      lookahead(wordBound()),
    ),
    captures: {
      1: nameRule(scopeName, placeholder.ruleName),
    },
  };
}

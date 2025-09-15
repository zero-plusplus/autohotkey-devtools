import {
  capture,
  char,
  ignoreCase,
  lookahead,
  lookbehind,
  many0,
  negativeLookbehind,
  seq,
  textalt,
  wordBound,
} from '../../../oniguruma';
import {
  nameRule,
  RuleName,
  StyleName,
  type MatchRule,
  type ScopeName,
} from '../../../tmlanguage';

interface Placeholder_IdentifierRule {
  ruleName: RuleName;
  identifierPattern: string;
  invalidIdentifierCharPattern?: string;
  endPattern?: string;
}
export function createIdentifierRule(scopeName: ScopeName, placeholder: Placeholder_IdentifierRule): MatchRule {
  return {
    match: seq(
      capture(placeholder.identifierPattern),
      ...(placeholder.invalidIdentifierCharPattern ? [ capture(many0(placeholder.invalidIdentifierCharPattern)) ] : []),
      lookahead(placeholder.endPattern ?? wordBound()),
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

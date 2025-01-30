import { RuleName, StyleName } from '../../../constants';
import { capture, char, escapeOnigurumaTexts, ignoreCase, lookahead, lookbehind, many1, manyRange, negativeLookbehind, ordalt, seq, wordBound } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { nameRule } from '../../../utils';

interface Placeholder_UserDefined {
  ruleName: RuleName;
  nameHeadChar: string;
  nameBodyChar: string;
}
export function createVariableRule(scopeName: ScopeName, placeholder: Placeholder_UserDefined): MatchRule {
  return {
    match: capture(seq(
      placeholder.nameHeadChar,
      manyRange(placeholder.nameBodyChar, 0, 252),
      lookahead(wordBound()),
    )),
    captures: {
      1: nameRule(scopeName, placeholder.ruleName),
    },
  };
}
export function createInvalidVariableRule(scopeName: ScopeName, placeholder: Placeholder_UserDefined): MatchRule {
  return {
    match: seq(
      capture(seq(placeholder.nameHeadChar, manyRange(placeholder.nameBodyChar, 252))),
      capture(many1(placeholder.nameBodyChar)),
    ),
    captures: {
      1: nameRule(scopeName, placeholder.ruleName),
      2: nameRule(scopeName, placeholder.ruleName, StyleName.Invalid),
    },
  };
}

interface Placeholder_BuiltIn {
  variableRuleName: RuleName;
  builtinVariables: readonly string[];
}
export function createBuiltinVariableRule(scopeName: ScopeName, placeholder: Placeholder_BuiltIn): MatchRule {
  return {
    match: ignoreCase(seq(
      lookbehind(wordBound()),
      negativeLookbehind(char('.')),
      capture(ordalt(...escapeOnigurumaTexts(placeholder.builtinVariables))),
      lookahead(wordBound()),
    )),
    captures: {
      1: nameRule(scopeName, placeholder.variableRuleName),
    },
  };
}

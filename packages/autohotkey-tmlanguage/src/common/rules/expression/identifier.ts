import { RuleName, StyleName } from '../../../constants';
import {
  capture, char, ignoreCase, lookahead, lookbehind, negativeLookbehind, optional, seq,
  textalt, wordBound,
} from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { nameRule } from '../../../utils';

interface Placeholder_IdentifierRule {
  ruleName: RuleName;
  identifierPattern: string;
}
export function createIdentifierRule(scopeName: ScopeName, placeholder: Placeholder_IdentifierRule): MatchRule {
  return {
    match: seq(
      capture(placeholder.identifierPattern),
      optional(capture(placeholder.identifierPattern)),
      lookahead(wordBound()),
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
    match: seq(
      lookbehind(wordBound()),
      negativeLookbehind(char('.')),
      capture(ignoreCase(textalt(...placeholder.builtinVariables))),
      lookahead(wordBound()),
    ),
    captures: {
      1: nameRule(scopeName, placeholder.variableRuleName),
    },
  };
}

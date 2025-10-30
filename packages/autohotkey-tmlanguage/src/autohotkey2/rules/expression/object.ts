import {
  anyChars1,
  capture,
  char,
  inlineSpaces0,
  seq,
} from '../../../oniguruma';
import {
  includeRule,
  name,
  nameRule,
  patternsRule,
  Repository,
  RuleName,
  StyleName,
  type MatchRule,
  type ScopeName,
} from '../../../tmlanguage';

interface Placeholder_ObjectKeyRule {
  keyPattern: string;
}
export function createObjectKeyRule(scopeName: ScopeName, placeholder: Placeholder_ObjectKeyRule): MatchRule {
  return {
    match: seq(
      capture(placeholder.keyPattern),
      inlineSpaces0(),
      capture(char(':')),
    ),
    captures: {
      1: patternsRule(
        includeRule(Repository.Dereference),
        includeRule(Repository.ConstantLikeVariable),
        includeRule(Repository.UserDefinedVariable),
        {
          name: name(scopeName, RuleName.Variable, StyleName.Invalid),
          match: anyChars1(),
        },
      ),
      2: nameRule(scopeName, RuleName.Colon),
    },
  };
}

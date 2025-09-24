import {
  capture,
  char,
  inlineSpaces0,
  lookbehind,
  seq,
} from '../../../oniguruma';
import {
  includeRule,
  nameRule,
  patternsRule,
  Repository,
  RuleName,
  type BeginEndRule,
  type MatchRule,
  type ScopeName,
} from '../../../tmlanguage';

interface Placeholder_ObjectRule {
  startPattern: string;
}
export function createObjectRule(scopeName: ScopeName, placeholder: Placeholder_ObjectRule): BeginEndRule {
  return {
    begin: seq(
      lookbehind(placeholder.startPattern),
      inlineSpaces0(),
      capture(char('{')),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.OpenBrace),
    },
    end: capture(char('}')),
    endCaptures: {
      1: nameRule(scopeName, RuleName.CloseBrace),
    },
    patterns: [ includeRule(Repository.ObjectContent) ],
  };
}

interface Placeholder_ObjectKeyRule {
  objectKeyNamePattern: string;
}
export function createObjectKeyRule(scopeName: ScopeName, placeholder: Placeholder_ObjectKeyRule): MatchRule {
  return {
    match: seq(
      capture(placeholder.objectKeyNamePattern),
      inlineSpaces0(),
      capture(char(':')),
    ),
    captures: {
      1: patternsRule(
        includeRule(Repository.Dereference),
        includeRule(Repository.ConstantLikeVariable),
        includeRule(Repository.UserDefinedVariable),
      ),
      2: nameRule(scopeName, RuleName.Colon),
    },
  };
}

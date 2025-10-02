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
  Repository,
  RuleName,
  type BeginEndRule,
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

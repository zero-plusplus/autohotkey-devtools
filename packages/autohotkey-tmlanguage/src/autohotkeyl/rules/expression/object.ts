import { Repository, RuleName } from '../../../constants';
import { capture, char, inlineSpaces0, lookbehind, seq } from '../../../oniguruma';
import type { BeginEndRule, MatchRule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  keyName: string;
}
export function createObjectRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    begin: seq(
      lookbehind(placeholder.startAnchor),
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
    patterns: [
      includeRule(Repository.Meta),

      createObjectKeyRule(scopeName, placeholder),
      includeRule(Repository.Comma),
      includeRule(Repository.Expression),
    ],
  };
}

function createObjectKeyRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      capture(placeholder.keyName),
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

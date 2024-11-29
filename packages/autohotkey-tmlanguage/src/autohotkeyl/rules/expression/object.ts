import { Repository, RuleName } from '../../../constants';
import { capture, char, inlineSpaces0, seq } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  keyName: string;
}
export function createObjectRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    begin: seq(
      placeholder.startAnchor,
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
      {
        match: seq(
          capture(placeholder.keyName),
          inlineSpaces0(),
          capture(char(':')),
        ),
        captures: {
          1: patternsRule(
            includeRule(Repository.Dereference),
            includeRule(Repository.Variable),
          ),
          2: nameRule(scopeName, RuleName.Colon),
        },
      },
      includeRule(Repository.Expressions),
      includeRule(Repository.Statement),
    ],
  };
}

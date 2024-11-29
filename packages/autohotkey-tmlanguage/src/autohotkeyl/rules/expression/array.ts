import { Repository, RuleName } from '../../../constants';
import { capture, char, inlineSpaces0, seq } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { includeRule, nameRule } from '../../../utils';

export function createArrayRule(scopeName: ScopeName): BeginEndRule {
  return {
    begin: capture(char('[')),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.OpenBracket),
    },
    end: seq(inlineSpaces0(), capture(char(']'))),
    endCaptures: {
      1: nameRule(scopeName, RuleName.CloseBracket),
    },
    patterns: [ includeRule(Repository.Expressions) ],
  };
}

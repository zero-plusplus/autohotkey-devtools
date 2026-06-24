import {
  capture,
  char,
  inlineSpaces0,
  lookbehind,
  seq,
} from '../../../oniguruma.ts';
import {
  includeRule,
  nameRule,
  patternsRule,
  Repository,
  RuleName,
  type PatternsRule,
  type ScopeName,
} from '../../../tmlanguage.ts';

export function createFunctionExpressionBlockRule(scopeName: ScopeName): PatternsRule {
  return patternsRule({
    begin: seq(
      lookbehind(seq(
        char(')'),
        inlineSpaces0(),
      )),
      inlineSpaces0(),
      capture(char('{')),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.BlockBegin),
    },
    end: capture(char('}')),
    endCaptures: {
      1: nameRule(scopeName, RuleName.BlockEnd),
    },
    patterns: [ includeRule(Repository.Self) ],
  });
}

import { RuleName } from '../../../constants';
import { capture, escapeOnigurumaTexts, ignoreCase, lookahead, lookbehind, many1, manyRange, numbers1, ordalt, seq, wordBound } from '../../../oniguruma';
import type { MatchRule, PatternsRule, ScopeName } from '../../../types';
import { nameRule, patternsRule } from '../../../utils';

export function createVariableRule(scopeName: ScopeName, nameStart: string, nameBody: string): MatchRule {
  return {
    match: capture(seq(nameStart, manyRange(nameBody, 0, 252))),
    captures: {
      1: nameRule(scopeName, RuleName.Variable),
    },
  };
}
export function createInvalidVariableRule(scopeName: ScopeName, nameStart: string, nameBody: string): PatternsRule {
  return patternsRule(
    {
      match: seq(
        capture(numbers1()),
        capture(seq(nameStart, manyRange(nameBody, 0, 252))),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.Variable, RuleName.Integer, RuleName.Invalid),
        2: nameRule(scopeName, RuleName.Variable),
      },
    },
    {
      match: seq(
        capture(seq(nameStart, manyRange(nameBody, 252))),
        capture(many1(nameBody)),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.Variable),
        2: nameRule(scopeName, RuleName.Variable, RuleName.Invalid),
      },
    },
  );
}
export function createBuiltinVariableRule(scopeName: ScopeName, builtinVariables: readonly string[]): MatchRule {
  return {
    match: ignoreCase(seq(
      lookbehind(wordBound()),
      capture(ordalt(...escapeOnigurumaTexts(builtinVariables))),
      lookahead(wordBound()),
    )),
    captures: {
      1: nameRule(scopeName, RuleName.BuiltInVariable),
    },
  };
}

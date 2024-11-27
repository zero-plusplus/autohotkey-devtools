import { Repository, RuleName } from '../../../constants';
import { capture, char, inlineSpace, inlineSpaces0, seq } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';
import * as patterns_v1 from '../../patterns';

export function createPercentExpressionRule(scopeName: ScopeName): MatchRule {
  return {
    match: seq(
      capture(seq(char('%'), inlineSpace())),
      inlineSpaces0(),
      capture(patterns_v1.expressionArgumentPattern),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.PercentExpressionBegin),
      2: patternsRule(includeRule(Repository.Expression)),
    },
  };
}

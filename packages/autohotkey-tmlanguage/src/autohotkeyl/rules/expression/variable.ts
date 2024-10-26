import { RuleName } from '../../../constants';
import { capture } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { nameRule } from '../../../utils';

export function createVariableRule(scopeName: ScopeName, name: string): MatchRule {
  return {
    match: capture(name),
    captures: {
      1: nameRule(scopeName, RuleName.Variable),
    },
  };
}

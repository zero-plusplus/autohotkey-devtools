import { RuleName } from '../../../constants';
import { escapeOnigurumaTexts, ordalt } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { name } from '../../../utils';

export function createOperatorRule(scopeName: ScopeName, operators: readonly string[]): MatchRule {
  return {
    name: name(scopeName, RuleName.Operator),
    match: ordalt(...escapeOnigurumaTexts(operators)),
  };
}

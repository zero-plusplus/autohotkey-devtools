import type { RuleName } from '../../../constants';
import { escapeOnigurumaTexts, ordalt } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { name } from '../../../utils';

interface Placeholder {
  operatorRuleName: RuleName;
  operators: readonly string[];
}
export function createOperatorRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    name: name(scopeName, placeholder.operatorRuleName),
    match: ordalt(...escapeOnigurumaTexts(placeholder.operators)),
  };
}

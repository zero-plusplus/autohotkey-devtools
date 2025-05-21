import { RuleName } from '../../../constants';
import { alt, char, escapeOnigurumaTexts, inlineSpace, negativeLookahead, ordalt, seq } from '../../../oniguruma';
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
export function createDotOperatorRule(scopeName: ScopeName): MatchRule {
  return {
    name: name(scopeName, RuleName.Dot),
    match: seq(char('.'), negativeLookahead(alt(
      char('='),
      inlineSpace(),
    ))),
  };
}

import { Repository, RuleName } from '../../../constants';
import { alt, char, escapeOnigurumaTexts, inlineSpace, negativeLookahead, ordalt, seq } from '../../../oniguruma';
import type { MatchRule, Repositories, ScopeName } from '../../../types';
import { name } from '../../../utils';

interface Placeholder {
  expressionOperators: readonly string[];
}
export function createOperatorRepositories(scopeName: ScopeName, placeholder: Placeholder): Repositories {
  return {
    [Repository.Comma]: createOperatorRule(scopeName, {
      operatorRuleName: RuleName.Comma,
      operators: [ ',' ],
    }),
    [Repository.Dot]: createDotOperatorRule(scopeName),
    [Repository.Operator]: createOperatorRule(scopeName, {
      operatorRuleName: RuleName.Operator,
      operators: placeholder.expressionOperators,
    }),
  };
}

interface Placeholder_OperatorRule {
  operatorRuleName: RuleName;
  operators: readonly string[];
}
export function createOperatorRule(scopeName: ScopeName, placeholder: Placeholder_OperatorRule): MatchRule {
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

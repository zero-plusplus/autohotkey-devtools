import {
  alt,
  char,
  inlineSpace,
  negativeLookahead,
  seq,
  textalt,
} from '../../../oniguruma';
import {
  name,
  RuleName,
  StyleName,
  type MatchRule,
  type ScopeName,
} from '../../../tmlanguage';

interface Placeholder_OperatorRule {
  operatorRuleName: RuleName;
  operators: readonly string[];
}
export function createOperatorRule(scopeName: ScopeName, placeholder: Placeholder_OperatorRule): MatchRule {
  return {
    name: name(scopeName, placeholder.operatorRuleName),
    match: textalt(...placeholder.operators),
  };
}
export function createInvalidOperatorRule(scopeName: ScopeName, placeholder: Placeholder_OperatorRule): MatchRule {
  return {
    name: name(scopeName, placeholder.operatorRuleName, StyleName.Invalid),
    match: textalt(...placeholder.operators),
  };
}
export function createDotOperatorRule(scopeName: ScopeName): MatchRule {
  return {
    name: name(scopeName, RuleName.Dot),
    match: seq(
      char('.'),
      negativeLookahead(alt(
        char('='),
        inlineSpace(),
      )),
    ),
  };
}

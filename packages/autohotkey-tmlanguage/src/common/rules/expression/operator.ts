import { alt, char, inlineSpace, lookahead, negativeLookahead, seq, textalt } from '../../../oniguruma';
import {
  name, Repository, RuleName,
  type MatchRule, type Repositories, type ScopeName,
} from '../../../tmlanguage';

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
    ...scopeName === 'autohotkeyl' ? {
      [Repository.DereferenceUnaryOperator]: {
        name: name(scopeName, RuleName.Operator),
        match: seq(
          char('+', '-', '^'),
          lookahead('%'),
        ),
      },
    } : {},
  };
}

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

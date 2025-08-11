import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInUnquotedParameterExpectedDataList } from '../common/dereference';
import { createExpectedData, type Placeholder } from '../helpers';

export function $expression(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...createDereferenceInUnquotedParameterExpectedDataList(scopeName, placeholder),
    createExpectedData(
      scopeName,
      `var + 123`,
      [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '+', scopes: name(scopeName, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },
      ],
      placeholder,
    ),
    createExpectedData(
      scopeName,
      `f()`,
      [
        { text: 'f', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
      placeholder,
    ),

    createExpectedData(
      scopeName,
      `% var`,
      [ { text: '% var', scopes: name(scopeName, RuleName.PercentExpressionBegin, StyleName.Invalid) } ],
      placeholder,
    ),

    ...(
      placeholder.isLastParameter
        ? [
          createExpectedData(
            scopeName,
            `f(),`,
            [
              { text: 'f', scopes: name(scopeName, RuleName.FunctionName) },
              { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
              { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
            ],
            placeholder,
          ),
        ]
        : []
    ),
  ];
}

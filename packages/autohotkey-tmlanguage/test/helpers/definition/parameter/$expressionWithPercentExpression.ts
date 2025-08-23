import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';

export function $expressionWithPercentExpression(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
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
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
      ],
      placeholder,
    ),
    createExpectedData(
      scopeName,
      `%var% + %a%b%c%`,
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },

        { text: '+', scopes: name(scopeName, RuleName.Operator) },

        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: 'c', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
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
          createExpectedData(
            scopeName,
            `% var,`,
            [
              { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
              { text: 'var', scopes: name(scopeName, RuleName.Variable) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
            ],
            placeholder,
          ),
          createExpectedData(
            scopeName,
            `%var% + %a%b%c%,`,
            [
              { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
              { text: 'var', scopes: name(scopeName, RuleName.Variable) },
              { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },

              { text: '+', scopes: name(scopeName, RuleName.Operator) },

              { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
              { text: 'a', scopes: name(scopeName, RuleName.Variable) },
              { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
              { text: 'b', scopes: name(scopeName, RuleName.Variable) },
              { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
              { text: 'c', scopes: name(scopeName, RuleName.Variable) },
              { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
            ],
            placeholder,
          ),
        ]
        : []
    ),
  ];
}

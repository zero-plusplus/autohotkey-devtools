import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

export function $expression(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    createCommandExpectedData(
      scopeName,
      `var + 123`,
      [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '+', scopes: name(scopeName, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },
      ],
      placeholder,
    ),
    createCommandExpectedData(
      scopeName,
      `f()`,
      [
        { text: 'f', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
      placeholder,
    ),
    createCommandExpectedData(
      scopeName,
      `% var`,
      [ { text: '% var', scopes: name(scopeName, RuleName.PercentExpressionBegin, StyleName.Invalid) } ],
      placeholder,
    ),
    createCommandExpectedData(
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
          createCommandExpectedData(
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
          createCommandExpectedData(
            scopeName,
            `% var,`,
            [
              { text: '% var', scopes: name(scopeName, RuleName.PercentExpressionBegin, StyleName.Invalid) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
            ],
            placeholder,
          ),
          createCommandExpectedData(
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

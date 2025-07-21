import { dedent } from '@zero-plusplus/utilities/src';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import * as common from '../../../common/expression/call';
import type { ExpectedTestData } from '../../../types';

export function createCallExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createCallExpressionExpectedData(scopeName),

    [
      dedent`
        %abc%()               ; comment
        %abc%edf()            ; comment
      `, [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: 'edf', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        Class()           ; comment
        Map()             ; comment
      `,
      [
        { text: 'Class', scopes: name(scopeName, RuleName.FunctionName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'Map', scopes: name(scopeName, RuleName.FunctionName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        (() => 123)()               ; comment
        ((&a, b := 10) => 123)()    ; comment
      `,
      [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '=>', scopes: name(scopeName, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '&', scopes: name(scopeName, RuleName.Operator) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '10', scopes: name(scopeName, RuleName.Integer) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '=>', scopes: name(scopeName, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        abc := { key: %abc()% }     ; comment
        return                      ; comment
      `,
      [
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: 'key', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'abc', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'return', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

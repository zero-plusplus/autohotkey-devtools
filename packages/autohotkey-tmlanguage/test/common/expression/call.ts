import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createCallExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // one line
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            abc()                 ; comment
            abc(a)                ; comment
            abc(a, (b * c), d)    ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'abc', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: 'a', scopes: name(scopeName, RuleName.Variable) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'abc', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: 'a', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: 'b', scopes: name(scopeName, RuleName.Variable) },
            { text: '*', scopes: name(scopeName, RuleName.Operator) },
            { text: 'c', scopes: name(scopeName, RuleName.Variable) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'd', scopes: name(scopeName, RuleName.Variable) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    })(),

    // continuation
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            abc(              ; comment
                              ; comment
              1,              ; comment
              2               ; comment
              , abc(          ; comment
                3,            ; comment
                4,            ; comment
              )               ; comment
            )                 ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '; comment', scopes: name(scopeName, RuleName.SingleLineComment) },

            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'abc', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '3', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '4', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            XXX(                  ; comment
              { key:              ; comment
                value }           ; comment
            )                     ; comment
          `,
          [
            { text: 'XXX', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'value', scopes: name(scopeName, RuleName.Variable) },
            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    })(),
  ];
}

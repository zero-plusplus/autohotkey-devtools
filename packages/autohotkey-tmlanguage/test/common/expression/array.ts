import { dedent, repeatArray } from '@zero-plusplus/utilities/src';
import {
  name, RuleDescriptor, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createArrayLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // one line
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            abc := []     ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            abc := [1]      ; comment
            abc := [ 1 ]    ; comment
          `,
          [
            ...repeatArray(2, [
              { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
              { text: ':=', scopes: name(scopeName, RuleName.Operator) },
              { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
              { text: '1', scopes: name(scopeName, RuleName.Integer) },
              { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            ]),
          ],
        ],
        [
          dedent`
            abc := [1,2]          ; comment
            abc := [ 1, 2 ]       ; comment
          `,
          [
            ...repeatArray(2, [
              { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
              { text: ':=', scopes: name(scopeName, RuleName.Operator) },
              { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
              { text: '1', scopes: name(scopeName, RuleName.Integer) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: '2', scopes: name(scopeName, RuleName.Integer) },
              { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            ]),
          ],
        ],
        [
          dedent`
            abc := [ ,, 1, 2,, ]        ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            abc := [ 1, [ 2 ], 3 ]      ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '3', scopes: name(scopeName, RuleName.Integer) },
            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
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
            abc := [      ; comment
            ]             ; comment
          `,
          [

            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            abc := [ 1            ; comment
                   , [ 2 ]        ; comment
                   , 3     ]      ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '3', scopes: name(scopeName, RuleName.Integer) },
            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            abc := [ ; inline comment
              ; line comment
              1, ; inline comment
              /* block comment
               */
            ] ; inline comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
            { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
            { text: '; line comment', scopes: name(scopeName, RuleName.SingleLineComment) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
            { text: '/*', scopes: name(scopeName, RuleName.MultiLineComment, RuleDescriptor.Begin) },
            { text: ' block comment', scopes: name(scopeName, RuleName.MultiLineComment) },
            { text: '*/', scopes: name(scopeName, RuleName.MultiLineComment, RuleDescriptor.End) },
            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    })(),
  ];
}

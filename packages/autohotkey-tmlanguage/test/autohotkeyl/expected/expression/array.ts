import { dedent, repeatArray } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createArrayLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        abc := []
        abc := [
        ]
      `, [
        ...repeatArray(2, [
          { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
          { text: ':=', scopes: name(scopeName, RuleName.Operator) },
          { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
          { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
        ]),
      ],
    ],
    [
      dedent`
        abc := [1]
        abc := [ 1 ]

        abc := [1,2]
        abc := [ 1 , 2 ]
      `, [
        ...repeatArray(2, [
          { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
          { text: ':=', scopes: name(scopeName, RuleName.Operator) },
          { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
          { text: '1', scopes: name(scopeName, RuleName.Integer) },
          { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
        ]),

        ...repeatArray(2, [
          { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
          { text: ':=', scopes: name(scopeName, RuleName.Operator) },
          { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
          { text: '1', scopes: name(scopeName, RuleName.Integer) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: '2', scopes: name(scopeName, RuleName.Integer) },
          { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
        ]),
      ],
    ],
    [
      dedent`
        abc := [ 1, [ 2 ], 3 ]
        abc := [ 1
               , [ 2 ]
               , 3     ]
      `, [
        ...repeatArray(2, [
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
        ]),
      ],
    ],

    // comment
    [
      dedent`
        abc := [] ; comment
        abc := [ ; comment
          ; comment
          1, ; comment
          /* comment
           */
        ] ; comment
      `, [
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
        { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
        { text: '; comment', scopes: name(scopeName, RuleName.SingleLineComment) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
        { text: '/*', scopes: name(scopeName, RuleName.MultiLineComment) },
        { text: ' comment', scopes: name(scopeName, RuleName.MultiLineComment) },
        { text: '*/', scopes: name(scopeName, RuleName.MultiLineComment) },
        { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

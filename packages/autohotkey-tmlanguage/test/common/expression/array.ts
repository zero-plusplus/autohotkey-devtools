import { dedent, repeatArray } from '@zero-plusplus/utilities/src';
import { RuleDescriptor, RuleName } from '../../../src/constants';
import type { ScopeName } from '../../../src/types';
import { name } from '../../../src/utils';
import type { ExpectedTestData } from '../../types';

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
        abc := [] ; inline comment
        abc := [ ; inline comment
          ; line comment
          1, ; inline comment
          /* block comment
           */
        ] ; inline comment
      `, [
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
        { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
        { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },

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
}

import {
  dedent,
} from '@zero-plusplus/utilities/src';
import {
  name,
  RuleDescriptor,
  RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import { createMultiLineExpectedData, createSingleLineExpectedData } from '../../helpers/definition/helpers';
import type { ExpectedTestData } from '../../types';

export function createArrayLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...createMultiLineExpectedData(
      scopeName,
      [
        ...[ `abc := []`, `abc := [  ]` ].map((text): ExpectedTestData => {
          return [
            text,
            [
              { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
              { text: ':=', scopes: name(scopeName, RuleName.Operator) },
              { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
              { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            ],
          ];
        }),
        ...[ `abc := [1]`, `abc := [ 1 ]` ].map((text): ExpectedTestData => {
          return [
            text,
            [
              { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
              { text: ':=', scopes: name(scopeName, RuleName.Operator) },
              { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
              { text: '1', scopes: name(scopeName, RuleName.Integer) },
              { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            ],
          ];
        }),
        ...[ `abc := [1,2]`, `abc := [ 1, 2 ]` ].map((text): ExpectedTestData => {
          return [
            text,
            [
              { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
              { text: ':=', scopes: name(scopeName, RuleName.Operator) },
              { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
              { text: '1', scopes: name(scopeName, RuleName.Integer) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: '2', scopes: name(scopeName, RuleName.Integer) },
              { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            ],
          ];
        }),
      ],
    ),
    createSingleLineExpectedData(
      scopeName,
      `abc := [ ,, 1, 2,, ]`,
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
      ],
    ),
    createSingleLineExpectedData(
      scopeName,
      `abc := [ 1, [ 2 ], 3 ]`,
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
      ],
    ),

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
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
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
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '3', scopes: name(scopeName, RuleName.Integer) },
            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
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
            { text: '; inline comment', scopes: name(scopeName, RuleName.InlineComment) },
            { text: '; line comment', scopes: name(scopeName, RuleName.SingleLineComment) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; inline comment', scopes: name(scopeName, RuleName.InlineComment) },
            { text: '/*', scopes: name(scopeName, RuleName.MultiLineComment, RuleDescriptor.Begin) },
            { text: ' block comment', scopes: name(scopeName, RuleName.MultiLineComment) },
            { text: '*/', scopes: name(scopeName, RuleName.MultiLineComment, RuleDescriptor.End) },
            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: '; inline comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),
  ];
}

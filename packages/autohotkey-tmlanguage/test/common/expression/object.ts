import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleDescriptor, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createObjectLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // one line
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            abc := {}             ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            abc := { }            ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            abc := { key: 1 }                  ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            abc := { %key%: 1 }                ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            abc := { key: 1, %key2%: 2 }       ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'key2', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            abc := { key: { %key2%: 2 } }     ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'key2', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
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
            abc := {      ; comment
                          ; comment
            }             ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '; comment', scopes: name(scopeName, RuleName.SingleLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            abc := {                    ; comment
              key: 1                    ; comment
            }                           ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            abc := {                    ; comment
              %key%: 1                  ; comment
            }                           ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            abc := {                    ; comment
              key: 1,                   ; comment
              %key2%: 2                 ; comment
            }                           ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'key2', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            abc := {            ; comment
              key: {            ; comment
                %key2%: 2       ; comment
              }                 ; comment
            }                   ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'key2', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    })(),

    // comment
    [
      dedent`
        abc := { key: { %key2%: 2 } } ; inline comment
        abc := { ; inline comment
          ; line comment
          /* block comment
           */
          key: { ; inline comment
            ; line comment
            /* block comment
             */
            %key2%: 2, ; inline comment
          }
        }
      `, [
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: 'key', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'key2', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '2', scopes: name(scopeName, RuleName.Integer) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
        { text: '; line comment', scopes: name(scopeName, RuleName.SingleLineComment) },
        { text: '/*', scopes: name(scopeName, RuleName.MultiLineComment, RuleDescriptor.Begin) },
        { text: ' block comment', scopes: name(scopeName, RuleName.MultiLineComment) },
        { text: '*/', scopes: name(scopeName, RuleName.MultiLineComment, RuleDescriptor.End) },
        { text: 'key', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
        { text: '; line comment', scopes: name(scopeName, RuleName.SingleLineComment) },
        { text: '/*', scopes: name(scopeName, RuleName.MultiLineComment, RuleDescriptor.Begin) },
        { text: ' block comment', scopes: name(scopeName, RuleName.MultiLineComment) },
        { text: '*/', scopes: name(scopeName, RuleName.MultiLineComment, RuleDescriptor.End) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'key2', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '2', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
      ],
    ],
  ];
}

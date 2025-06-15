import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, Repository, RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createLegacyIfStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // [IfBetween](https://www.autohotkey.com/docs/v1/lib/IfBetween.htm)
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            if value between                            ; comment
            {                                           ; comment
            }                                           ; comment
            if value between a                          ; comment
            {                                           ; comment
            }                                           ; comment
            if value between a and                      ; comment
            {                                           ; comment
            }                                           ; comment
            if value between a and b                    ; comment
            {                                           ; comment
            }                                           ; comment
          `,
          [
            ...[
              { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
              { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: 'between', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
              { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: 'between', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: 'a', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
              { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: 'between', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: 'a', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: 'and', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
              { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: 'between', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: 'a', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: 'and', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: 'b', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
        ],
        [
          dedent`
            if value not between                        ; comment
            {                                           ; comment
            }                                           ; comment

            if value not between a                      ; comment
            {                                           ; comment
            }                                           ; comment

            if value not between a and                  ; comment
            {                                           ; comment
            }                                           ; comment

            if value not between a and b                ; comment
            {                                           ; comment
            }                                           ; comment
          `,
          [
            ...[
              { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
              { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: 'not', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: 'between', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
              { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: 'not', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: 'between', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: 'a', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
              { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: 'not', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: 'between', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: 'a', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: 'and', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
              { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: 'not', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: 'between', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: 'a', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: 'and', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: 'b', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
        ],
      ];
    })(),

    // [IfIs](https://www.autohotkey.com/docs/v1/lib/IfIs.htm)
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            if value is                     ; comment
            {                               ; comment
            }                               ; comment
            if value is not                 ; comment
            {                               ; comment
            }                               ; comment
          `,
          [
            ...[
              { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
              { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: 'is', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
              { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
              { text: 'is', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: 'not', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
        ],
        [
          dedent`
            if value is integer             ; comment
            {                               ; comment
            }                               ; comment

            if value is float               ; comment
            {                               ; comment
            }                               ; comment

            if value is number              ; comment
            {                               ; comment
            }                               ; comment

            if value is digit               ; comment
            {                               ; comment
            }                               ; comment

            if value is xdigit              ; comment
            {                               ; comment
            }                               ; comment

            if value is alpha               ; comment
            {                               ; comment
            }                               ; comment

            if value is upper               ; comment
            {                               ; comment
            }                               ; comment

            if value is lower               ; comment
            {                               ; comment
            }                               ; comment

            if value is alnum               ; comment
            {                               ; comment
            }                               ; comment

            if value is space               ; comment
            {                               ; comment
            }                               ; comment

            if value is time                ; comment
            {                               ; comment
            }                               ; comment
          `,
          [
            ...[ 'integer', 'float', 'number', 'digit', 'xdigit', 'alpha', 'upper', 'lower', 'alnum', 'space', 'time' ].flatMap((word) => {
              return [
                ...[
                  { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
                  { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
                  { text: 'is', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
                  { text: word, scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordLikeBuiltInVariable) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                  { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                ],
              ];
            }),
          ],
        ],
        [
          dedent`
            if value is not integer         ; comment
            {                               ; comment
            }                               ; comment

            if value is not float           ; comment
            {                               ; comment
            }                               ; comment

            if value is not number          ; comment
            {                               ; comment
            }                               ; comment

            if value is not digit           ; comment
            {                               ; comment
            }                               ; comment

            if value is not xdigit          ; comment
            {                               ; comment
            }                               ; comment

            if value is not alpha           ; comment
            {                               ; comment
            }                               ; comment

            if value is not upper           ; comment
            {                               ; comment
            }                               ; comment

            if value is not lower           ; comment
            {                               ; comment
            }                               ; comment

            if value is not alnum           ; comment
            {                               ; comment
            }                               ; comment

            if value is not space           ; comment
            {                               ; comment
            }                               ; comment

            if value is not time            ; comment
            {                               ; comment
            }                               ; comment
          `,
          [
            ...[ 'integer', 'float', 'number', 'digit', 'xdigit', 'alpha', 'upper', 'lower', 'alnum', 'space', 'time' ].flatMap((word) => {
              return [
                ...[
                  { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
                  { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
                  { text: 'is', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
                  { text: 'not', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
                  { text: word, scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordLikeBuiltInVariable) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                  { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                ],
              ];
            }),
          ],
        ],
      ];
    })(),

    // [IfIn](https://www.autohotkey.com/docs/v1/lib/IfIn.htm)
    ...[ 'in', 'contains' ].map((keyword): ExpectedTestData => {
      return [
        dedent`
          if value ${keyword} a,b,c                 ; comment
          {                                         ; comment
          }                                         ; comment
          if value not ${keyword} a,b,c             ; comment
          {                                         ; comment
          }                                         ; comment
        `,
        [
          ...[
            { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
            { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
            { text: keyword, scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
            { text: 'a,b,c', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],

          ...[
            { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
            { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
            { text: 'not', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
            { text: keyword, scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
            { text: 'a,b,c', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    }),
  ];
}

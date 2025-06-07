import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, Repository, RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createLegacyIfStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      // #region [IfBetween](https://www.autohotkey.com/docs/v1/lib/IfBetween.htm)
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
        if value not between a and b                ; comment
        {                                           ; comment
        }                                           ; comment
      `, [
        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'between', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'between', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'a', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'between', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'a', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'and', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'between', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'a', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'and', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'b', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'not', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'between', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'a', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'and', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'b', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
    // #endregion IfBetween

    // #region [IfIs](https://www.autohotkey.com/docs/v1/lib/IfIs.htm)
    [
      dedent`
        if value is
        if value is integer
        if value is float
        if value is number
        if value is digit
        if value is xdigit
        if value is alpha
        if value is upper
        if value is lower
        if value is alnum
        if value is space
        if value is time
        if value is not time
        {
        }
      `, [
        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'is', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },

        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'is', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'integer', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordLikeBuiltInVariable) },

        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'is', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'float', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordLikeBuiltInVariable) },

        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'is', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'number', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordLikeBuiltInVariable) },

        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'is', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'digit', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordLikeBuiltInVariable) },

        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'is', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'xdigit', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordLikeBuiltInVariable) },

        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'is', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'alpha', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordLikeBuiltInVariable) },

        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'is', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'upper', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordLikeBuiltInVariable) },

        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'is', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'lower', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordLikeBuiltInVariable) },

        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'is', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'alnum', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordLikeBuiltInVariable) },

        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'is', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'space', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordLikeBuiltInVariable) },

        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'is', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'time', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordLikeBuiltInVariable) },

        { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
        { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
        { text: 'is', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'not', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
        { text: 'time', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordLikeBuiltInVariable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
    // #endregion IfIs

    // #region [IfIn](https://www.autohotkey.com/docs/v1/lib/IfIn.htm)
    ...[ 'in', 'contains' ].map((keyword): ExpectedTestData => {
      return [
        dedent`
          if value ${keyword} a,b,c
          if value not ${keyword} a,b,c
          {
          }
          `, [
          { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
          { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
          { text: keyword, scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
          { text: 'a,b,c', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.UnquotedString) },


          { text: 'if', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.ControlFlowKeyword) },
          { text: 'value', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.Variable) },
          { text: 'not', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
          { text: keyword, scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.KeywordInExpression) },
          { text: 'a,b,c', scopes: name(scopeName, Repository.LegacyIfStatement, RuleName.UnquotedString) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ],
      ];
    }),
    // #endregion IfIn
  ];
}

import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createSwitchStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...((): ExpectedTestData[] => {
      return [
        // one true brace style
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                switch {      ; comment
                }             ; comment
              `,
              [
                { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                Switch {      ; comment
                }             ; comment
              `,
              [
                { text: 'Switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                switch true {     ; comment
                }                 ; comment
              `,
              [
                { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                switch (true) {       ; comment
                }                     ; comment
              `,
              [
                { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                switch true {           ; comment
                  case true: break      ; comment
                  default: break        ; comment
                }                       ; comment
              `,
              [
                { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: ':', scopes: name(scopeName, RuleName.Colon) },
                { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'default', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
                { text: ':', scopes: name(scopeName, RuleName.Colon) },
                { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                switch true {         ; comment
                  case true: {        ; comment
                    break             ; comment
                  }                   ; comment
                  default: {          ; comment
                    break             ; comment
                  }                   ; comment
                }                     ; comment
              `,
              [
                { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: ':', scopes: name(scopeName, RuleName.Colon) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'default', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
                { text: ':', scopes: name(scopeName, RuleName.Colon) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                switch true {                     ; comment
                  case true, false: break         ; comment
                  default: break                  ; comment
                }                                 ; comment
              `,
              [
                { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: 'false', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: ':', scopes: name(scopeName, RuleName.Colon) },
                { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'default', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
                { text: ':', scopes: name(scopeName, RuleName.Colon) },
                { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
          ];
        })(),

        // K&R style
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                switch          ; comment
                {               ; comment
                }               ; comment
              `,
              [
                { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                switch true       ; comment
                {                 ; comment
                }                 ; comment
              `,
              [
                { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                switch (true)       ; comment
                {                   ; comment
                }                   ; comment
              `,
              [
                { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                switch true         ; comment
                {                   ; comment
                  case true:        ; comment
                    break           ; comment
                  default:          ; comment
                    break           ; comment
                }                   ; comment
              `,
              [
                { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: ':', scopes: name(scopeName, RuleName.Colon) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'default', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
                { text: ':', scopes: name(scopeName, RuleName.Colon) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                switch true         ; comment
                {                   ; comment
                  case true:        ; comment
                  {                 ; comment
                    break           ; comment
                  }                 ; comment
                  default:          ; comment
                  {                 ; comment
                    break           ; comment
                  }                 ; comment
                }                   ; comment
              `,
              [
                { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: ':', scopes: name(scopeName, RuleName.Colon) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'default', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
                { text: ':', scopes: name(scopeName, RuleName.Colon) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
          ];
        })(),
      ];
    })(),

    // Incomplete switch labels
    [
      dedent`
        switch (true) {           ; comment
          case                    ; comment
          case:                   ; comment
          default                 ; comment
          default:                ; comment
        }                         ; comment
        switch (true)             ; comment
        {                         ; comment
          case                    ; comment
          case:                   ; comment
          default                 ; comment
          default:                ; comment
        }                         ; comment
      `,
      [
        ...[
          { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

          { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

          { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
          { text: ':', scopes: name(scopeName, RuleName.Colon) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

          { text: 'default', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

          { text: 'default', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
          { text: ':', scopes: name(scopeName, RuleName.Colon) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
        ],

        ...[
          { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

          { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

          { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
          { text: ':', scopes: name(scopeName, RuleName.Colon) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

          { text: 'default', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

          { text: 'default', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
          { text: ':', scopes: name(scopeName, RuleName.Colon) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
        ],
      ],
    ],

    // Multi-line expressions in switch case label
    [
      dedent`
        switch (true)           ; comment
        {                       ; comment
          case a,               ; comment
               b:               ; comment
            break               ; comment

          default:              ; comment
            break               ; comment

          case c                ; comment
             , d:               ; comment
            break               ; comment
        }                       ; comment
      `,
      [
        { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'default', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
        { text: 'c', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'd', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

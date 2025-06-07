import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createWhileStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...((): ExpectedTestData[] => {
      return [
        // one true brace style
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                while {         ; comment
                }               ; comment
              `,
              [
                { text: 'while', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                while (true) {      ; comment
                }                   ; comment
              `,
              [
                { text: 'while', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
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
                while             ; comment
                {                 ; comment
                }                 ; comment
              `,
              [
                { text: 'while', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                while (true)        ; comment
                {                   ; comment
                }                   ; comment
              `,
              [
                { text: 'while', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
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
          ];
        })(),
      ];
    })(),
  ];
}

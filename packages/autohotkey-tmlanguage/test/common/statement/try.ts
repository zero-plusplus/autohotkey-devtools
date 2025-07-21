import { dedent } from '@zero-plusplus/utilities/src';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createTryStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...((): ExpectedTestData[] => {
      return [
        // one true brace style
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                try {         ; comment
                }             ; comment
              `,
              [
                { text: 'try', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                catch err {       ; comment
                }                 ; comment
              `,
              [
                { text: 'catch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'err', scopes: name(scopeName, RuleName.Variable) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                finally {       ; comment
                }               ; comment
              `,
              [
                { text: 'finally', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                try {               ; comment
                } catch err {       ; comment
                } finally {         ; comment
                }                   ; comment
              `,
              [
                { text: 'try', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: 'catch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'err', scopes: name(scopeName, RuleName.Variable) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: 'finally', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
          ];
        })(),

        // K&R style
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                try         ; comment
                {           ; comment
                }           ; comment
              `,
              [
                { text: 'try', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                catch err       ; comment
                {               ; comment
                }               ; comment
              `,
              [
                { text: 'catch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'err', scopes: name(scopeName, RuleName.Variable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                finally       ; comment
                {             ; comment
                }             ; comment
              `,
              [
                { text: 'finally', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                try                 ; comment
                {                   ; comment
                }                   ; comment
                catch err           ; comment
                {                   ; comment
                }                   ; comment
                finally             ; comment
                {                   ; comment
                }                   ; comment
              `,
              [
                { text: 'try', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'catch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'err', scopes: name(scopeName, RuleName.Variable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'finally', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
          ];
        })(),
      ];
    })(),
  ];
}

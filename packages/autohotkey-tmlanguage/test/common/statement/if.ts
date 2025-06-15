import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createIfStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // one true brace style
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            if (true) {         ; comment
            }                   ; comment
          `,
          [
            { text: 'if', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            else {        ; comment
            }             ; comment
          `,
          [
            { text: 'else', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            else if (true) {        ; comment
            }                       ; comment
          `,
          [
            { text: 'else if', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            if true {                 ; comment
            } else if true {          ; comment
            } else {                  ; comment
            }                         ; comment
          `,
          [
            { text: 'if', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
            { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: 'else if', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
            { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: 'else', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
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
            if (true)           ; comment
            {                   ; comment
            }                   ; comment
          `,
          [
            { text: 'if', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            else        ; comment
            {           ; comment
            }           ; comment
          `,
          [
            { text: 'else', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            else if (true)        ; comment
            {                     ; comment
            }                     ; comment
          `,
          [
            { text: 'else if', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            if true                 ; comment
            {                       ; comment
            } else if true          ; comment
            {                       ; comment
            } else                  ; comment
            {                       ; comment
            }                       ; comment
          `,
          [
            { text: 'if', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
            { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: 'else if', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
            { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: 'else', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
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
}

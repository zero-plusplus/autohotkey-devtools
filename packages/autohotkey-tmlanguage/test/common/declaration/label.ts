import { dedent } from '@zero-plusplus/utilities/src';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createLabelStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        abc_123:       ; comment
      `,
      [
        { text: 'abc_123', scopes: name(scopeName, RuleName.LabelName) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        123_abc:       ; comment
      `,
      [
        { text: '123_abc', scopes: name(scopeName, RuleName.LabelName) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        abc:              ; comment
          return          ; comment
      `,
      [
        { text: 'abc', scopes: name(scopeName, RuleName.LabelName) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'return', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        abc:          ; comment
        {             ; comment
          return      ; comment
        }             ; comment
      `,
      [
        { text: 'abc', scopes: name(scopeName, RuleName.LabelName) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'return', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        abc:            ; comment
          abc(){        ; comment
            return      ; comment
          }             ; comment
      `,
      [
        { text: 'abc', scopes: name(scopeName, RuleName.LabelName) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'abc', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'return', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

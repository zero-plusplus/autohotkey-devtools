import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName, StyleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createContinuationSectionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        (               ; comment
          text          ; text
        )               ; comment
      `, [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'text          ; text', scopes: name(scopeName, RuleName.UnquotedString) },

        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        (Join\`r\`n         ; comment
        )                   ; comment
        (Join|              ; comment
        )                   ; comment
      `, [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'Join`r`n', scopes: name(scopeName, RuleName.ContinuationOption, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'Join|', scopes: name(scopeName, RuleName.ContinuationOption, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        Gui,        ; comment
        (           ; comment
        ), text     ; comment
      `, [
        { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'text', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],

    // invalid
    [
      dedent`
        (xxx                    ; comment
        )                       ; comment
      `,
      [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'xxx', scopes: name(scopeName, RuleName.ContinuationOption, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

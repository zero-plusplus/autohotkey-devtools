import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createJumpStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...[ 'Break', 'Continue', 'Gosub', 'Goto' ].flatMap((command): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${command}                        ; comment
            ${command} label                  ; comment
            ${command}, label                 ; comment
          `,
          [
            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: 'label', scopes: name(scopeName, RuleName.LabelName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'label', scopes: name(scopeName, RuleName.LabelName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            {                                   ; comment
              ${command}                        ; comment
              ${command} label                  ; comment
              ${command}, label                 ; comment
            }                                   ; comment
          `,
          [
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: 'label', scopes: name(scopeName, RuleName.LabelName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'label', scopes: name(scopeName, RuleName.LabelName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    }),
    ...[ 'Exit', 'ExitApp', 'Return' ].flatMap((command): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${command}                ; comment
            ${command} 1              ; comment
            ${command}, 1             ; comment
          `,
          [
            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            ${command} (          ; comment
            )                     ; comment
            ${command}, (         ; comment
            )                     ; comment

            ${command} {          ; comment
              key: value          ; comment
            }                     ; comment
          `,
          [
            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: 'value', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    }),
  ];
}

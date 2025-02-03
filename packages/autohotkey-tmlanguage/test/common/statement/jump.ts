import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../src/constants';
import type { ScopeName } from '../../../src/types';
import { name } from '../../../src/utils';
import type { ExpectedTestData } from '../../types';

export function createJumpStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...[ 'Break', 'Continue', 'Gosub', 'Goto' ].flatMap((command): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${command}
            ${command} label
            ${command}, label

            {
              ${command}
            }
          `,
          [
            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: 'label', scopes: name(scopeName, RuleName.LabelName) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'label', scopes: name(scopeName, RuleName.LabelName) },

            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          ],
        ],
      ];
    }),
    ...[ 'Exit', 'ExitApp', 'Return' ].flatMap((command): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${command}
            ${command} 1
            ${command}, 1
            ${command} (
            )
            ${command}, (
            )

            ${command} {
              key: value
            }

            {
              ${command}
            }
          `,
          [
            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: 'value', scopes: name(scopeName, RuleName.Variable) },
            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },

            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          ],
        ],
      ];
    }),
  ];
}

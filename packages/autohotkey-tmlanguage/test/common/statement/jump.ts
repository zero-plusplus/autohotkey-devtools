import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../src/constants';
import type { ScopeName } from '../../../src/types';
import { name } from '../../../src/utils';
import type { ExpectedTestData } from '../../types';

export function createJumpStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...[ 'Break', 'Gosub', 'Goto' ].flatMap((command): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${command}
            ${command} label
            ${command}, label
          `,
          [
            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: 'label', scopes: name(scopeName, RuleName.LabelName) },

            { text: command, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'label', scopes: name(scopeName, RuleName.LabelName) },
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
          ],
        ],
      ];
    }),
  ];
}

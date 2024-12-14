import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createJumpStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        Break
        Break label
        Break, label

        Gosub
        Gosub label
        Gosub, label

        Goto
        Goto label
        Goto, label
      `,
      [
        ...[ 'Break', 'Gosub', 'Goto' ].flatMap((jumpCommandName) => {
          return [
            { text: jumpCommandName, scopes: name(scopeName, RuleName.JumpCommandName) },

            { text: jumpCommandName, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: 'label', scopes: name(scopeName, RuleName.LabelName) },

            { text: jumpCommandName, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'label', scopes: name(scopeName, RuleName.LabelName) },
          ];
        }),
      ],
    ],

    [
      dedent`
        Exit
        Exit 1
        Exit, 1
        Exit (
        )
        Exit, (
        )

        ExitApp
        ExitApp 1
        ExitApp, 1
        ExitApp (
        )
        ExitApp, (
        )

        Return
        Return 1
        Return, 1
        Return (
        )
        Return, (
        )
      `,
      [
        ...[ 'Exit', 'ExitApp', 'Return' ].flatMap((jumpCommandName) => {
          return [
            { text: jumpCommandName, scopes: name(scopeName, RuleName.JumpCommandName) },

            { text: jumpCommandName, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },

            { text: jumpCommandName, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },

            { text: jumpCommandName, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

            { text: jumpCommandName, scopes: name(scopeName, RuleName.JumpCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          ];
        }),
      ],
    ],
  ];
}

import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createHotkeyLabelStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        a::                                   ; comment
        ~a::Return                            ; comment
        $+!#abc::Return                       ; comment
        LShift & Left::Return                 ; comment
      `,
      [
        { text: 'a', scopes: name(scopeName, RuleName.HotkeyLabelName) },
        { text: '::', scopes: name(scopeName, RuleName.ColonColon) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '~', scopes: name(scopeName, RuleName.HotkeyFlag) },
        { text: 'a', scopes: name(scopeName, RuleName.HotkeyLabelName) },
        { text: '::', scopes: name(scopeName, RuleName.ColonColon) },
        { text: 'Return', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '$', scopes: name(scopeName, RuleName.HotkeyFlag) },
        { text: '+!#', scopes: name(scopeName, RuleName.HotkeyModifier) },
        { text: 'abc', scopes: name(scopeName, RuleName.HotkeyLabelName) },
        { text: '::', scopes: name(scopeName, RuleName.ColonColon) },
        { text: 'Return', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'LShift', scopes: name(scopeName, RuleName.HotkeyLabelName) },
        { text: '&', scopes: name(scopeName, RuleName.HotkeyCombinator) },
        { text: 'Left', scopes: name(scopeName, RuleName.HotkeyLabelName) },
        { text: '::', scopes: name(scopeName, RuleName.ColonColon) },
        { text: 'Return', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

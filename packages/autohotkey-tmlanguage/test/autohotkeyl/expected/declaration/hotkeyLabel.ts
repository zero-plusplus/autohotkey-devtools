import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createHotkeyLabelStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createHotkeyLabelStatementExpectedData(scopeName),

    [
      dedent`
        ^c::              ; comment
        {                 ; comment
          Send, ^c        ; comment
        }                 ; comment
      `,
      [
        { text: '^', scopes: name(scopeName, RuleName.HotkeyModifier) },
        { text: 'c', scopes: name(scopeName, RuleName.HotkeyLabelName) },
        { text: '::', scopes: name(scopeName, RuleName.ColonColon) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Send', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '^c', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

import { dedent } from '@zero-plusplus/utilities/src/index.ts';
import {
  name,
  RuleName,
  StyleName,
  type ScopeName,
} from '../../../../src/tmlanguage.ts';
import * as common from '../../../common/index.ts';
import type { ExpectedTestData } from '../../../types.ts';

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
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'Send', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '^c', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

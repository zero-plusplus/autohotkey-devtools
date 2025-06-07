import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createSwitchStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createSwitchStatementExpectedData(scopeName),

    // Comma after switch is allowed in v1
    [
      dedent`
        switch, true {          ; comment
        }                       ; comment
      `,
      [
        { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // Treat after the case statement as the start of a statement
    [
      dedent`
        switch {                ; comment
          case true: MsgBox     ; comment
        }                       ; comment
      `,
      [
        { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
        { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'MsgBox', scopes: name(scopeName, RuleName.CommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

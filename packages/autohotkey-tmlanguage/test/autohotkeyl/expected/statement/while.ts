import { dedent } from '@zero-plusplus/utilities/src/index.ts';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage.ts';
import * as common from '../../../common/index.ts';
import type { ExpectedTestData } from '../../../types.ts';

export function createWhileStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createWhileStatementExpectedData(scopeName),

    // Comma after switch is allowed in v1
    [
      dedent`
        while, true {         ; comment
        }                     ; comment
      `,
      [
        { text: 'while', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

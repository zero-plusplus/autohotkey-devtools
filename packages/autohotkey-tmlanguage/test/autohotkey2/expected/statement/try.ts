import { dedent } from '@zero-plusplus/utilities/src';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createTryStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createTryStatementExpectedData(scopeName),

    [
      dedent`
        try {                     ; comment
        }                         ; comment
        catch Error {             ; comment
        }                         ; comment
        catch Error as {          ; comment
        }                         ; comment
        Catch Error As err {      ; comment
        }                         ; comment
      `,
      [
        ...[
          { text: 'try', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],

        ...[
          { text: 'catch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: 'Error', scopes: name(scopeName, RuleName.ClassName) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],

        ...[
          { text: 'catch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: 'Error', scopes: name(scopeName, RuleName.ClassName) },
          { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],

        ...[
          { text: 'Catch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: 'Error', scopes: name(scopeName, RuleName.ClassName) },
          { text: 'As', scopes: name(scopeName, RuleName.KeywordInExpression) },
          { text: 'err', scopes: name(scopeName, RuleName.Variable) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],
      ],
    ],
  ];
}

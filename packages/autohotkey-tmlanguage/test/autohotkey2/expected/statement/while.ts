import { dedent, repeatArray } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createWhileStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createWhileStatementExpectedData(scopeName),

    [
      dedent`
        while true {
        }
        else {
        }
        while true
        {
        }
        else
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'while', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: 'else', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),
      ],
    ],
  ];
}

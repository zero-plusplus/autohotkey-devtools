import { dedent, repeatArray } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createWhileStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        while {
        }
        while
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'while', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),
      ],
    ],
    [
      dedent`
        while (true) {
        }
        while (true)
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'while', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),
      ],
    ],
  ];
}

import { dedent, repeatArray } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../src/constants';
import { name } from '../../../src/tmlanguage';
import type { ScopeName } from '../../../src/types';
import type { ExpectedTestData } from '../../types';

export function createIfStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        if (true) {
        }
        if (true)
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'if', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),
      ],
    ],
    [
      dedent`
        else {
        }
        else
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'else', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),
      ],
    ],
    [
      dedent`
        else if (true) {
        }
        else if (true)
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'else if', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),
      ],
    ],
    [
      dedent`
        if true {
        } else if true {
        } else {
        }

        if true
        {
        } else if true
        {
        } else
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'if', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

          { text: 'else if', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
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

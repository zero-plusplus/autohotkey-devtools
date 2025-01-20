import { dedent, repeatArray } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../src/constants';
import type { ScopeName } from '../../../src/types';
import { name } from '../../../src/utils';
import type { ExpectedTestData } from '../../types';

export function createTryStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        try {
        }
        try
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'try', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),
      ],
    ],
    [
      dedent`
        catch error {
        }
        catch error
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'catch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: 'error', scopes: name(scopeName, RuleName.Variable) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),
      ],
    ],
    [
      dedent`
        finally {
        }
        finally
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'finally', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),
      ],
    ],
    [
      dedent`
        try {
        } catch error {
        } finally {
        }

        try
        {
        }
        catch error
        {
        }
        finally
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'try', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

          { text: 'catch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: 'error', scopes: name(scopeName, RuleName.Variable) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

          { text: 'finally', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),
      ],
    ],
  ];
}

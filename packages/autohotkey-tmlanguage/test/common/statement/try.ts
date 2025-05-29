import { dedent, repeatArray } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
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
        catch err {
        }
        catch err
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'catch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: 'err', scopes: name(scopeName, RuleName.Variable) },
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
        } catch err {
        } finally {
        }

        try
        {
        }
        catch err
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
          { text: 'err', scopes: name(scopeName, RuleName.Variable) },
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

import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

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
        { text: 'try', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'try', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
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
        { text: 'catch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'error', scopes: name(scopeName, RuleName.Variable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'catch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'error', scopes: name(scopeName, RuleName.Variable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
    [
      dedent`
        try {
        } catch error {
        }
      `,
      [
        { text: 'try', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'catch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'error', scopes: name(scopeName, RuleName.Variable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
  ];
}

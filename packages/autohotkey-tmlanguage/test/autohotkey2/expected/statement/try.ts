import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createTryStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createTryStatementExpectedData(scopeName),

    [
      dedent`
        try {
        }
        catch Error as err {
        }
      `,
      [
        { text: 'try', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'catch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Error', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'err', scopes: name(scopeName, RuleName.Variable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
  ];
}

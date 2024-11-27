import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createThrowStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        throw Error
        throw, Error
      `,
      [
        { text: 'throw', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Error', scopes: name(scopeName, RuleName.Variable) },

        { text: 'throw', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Error', scopes: name(scopeName, RuleName.Variable) },
      ],
    ],
  ];
}

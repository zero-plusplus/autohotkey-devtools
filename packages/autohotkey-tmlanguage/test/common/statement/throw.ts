import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../src/constants';
import { name } from '../../../src/tmlanguage';
import type { ScopeName } from '../../../src/types';
import type { ExpectedTestData } from '../../types';

export function createThrowStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        throw err
        throw, err
      `,
      [
        { text: 'throw', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'err', scopes: name(scopeName, RuleName.Variable) },

        { text: 'throw', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'err', scopes: name(scopeName, RuleName.Variable) },
      ],
    ],
  ];
}

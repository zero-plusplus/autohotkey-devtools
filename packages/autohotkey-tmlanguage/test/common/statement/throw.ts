import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
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

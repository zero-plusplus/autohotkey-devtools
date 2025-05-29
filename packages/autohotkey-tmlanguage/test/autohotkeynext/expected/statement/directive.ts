import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import { name } from '../../../../src/tmlanguage';
import type { ScopeName } from '../../../../src/types';
import * as expected_v2 from '../../../autohotkey2/expected/statement/directive';
import type { ExpectedTestData } from '../../../types';

export function createDirectiveStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...expected_v2.createDirectiveStatementExpectedData(scopeName),
    [
      dedent`
        #Module ModuleName ; comment
      `,
      [
        { text: '#Module', scopes: name(scopeName, RuleName.DirectiveName) },
        { text: 'ModuleName', scopes: name(scopeName, RuleName.Namespace) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

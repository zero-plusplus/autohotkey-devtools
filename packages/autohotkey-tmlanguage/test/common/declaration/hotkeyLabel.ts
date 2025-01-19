import { dedent } from '@zero-plusplus/utilities/src';
import { Repository, RuleName } from '../../../src/constants';
import type { ScopeName } from '../../../src/types';
import { name } from '../../../src/utils';
import type { ExpectedTestData } from '../../types';

export function createHotkeyLabelStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        ^abc::Return
      `,
      [
        { text: '^abc', scopes: name(scopeName, Repository.HotkeyLabelStatement, RuleName.HotkeyLabelName) },
        { text: '::', scopes: name(scopeName, Repository.HotkeyLabelStatement, RuleName.ColonColon) },
        { text: 'Return', scopes: name(scopeName, RuleName.JumpCommandName) },
      ],
    ],
  ];
}

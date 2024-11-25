import { Repository, RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createHotkeyLabelStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      '^abc::Send, A',
      [
        { text: '^abc', scopes: name(scopeName, Repository.HotkeyLabelStatement, RuleName.HotkeyLabelName) },
        { text: '::', scopes: name(scopeName, Repository.HotkeyLabelStatement, RuleName.ColonColon) },
        { text: 'Send', scopes: name(scopeName, Repository.CommandStatement, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, Repository.CommandStatement, RuleName.Comma) },
        { text: 'A', scopes: name(scopeName, Repository.CommandStatement, RuleName.UnquotedString) },
      ],
    ],
  ];
}

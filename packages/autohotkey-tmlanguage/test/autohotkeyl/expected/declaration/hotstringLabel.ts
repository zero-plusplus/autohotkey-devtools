import { Repository, RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createHotstringLabelStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      ':*?0?B0bC1C0cK10k-1O0oP1p-1R0rSISPSETXZ:abc::text',
      [
        { text: ':', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.Colon) },
        { text: '*', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: '?0', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: '?', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'B0', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'b', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'C1', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'C0', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'c', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'K10', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'k-1', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'O0', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'o', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'P1', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'p-1', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'R0', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'r', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'SI', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'SP', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'SE', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'T', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'X', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'Z', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringOption, StyleName.Strong) },
        { text: ':', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.Colon) },
        { text: 'abc', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.HotstringLabelName) },
        { text: '::', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.ColonColon) },
        { text: 'text', scopes: name(scopeName, Repository.HotstringLabelStatement, RuleName.UnquotedString) },
      ],
    ],
  ];
}

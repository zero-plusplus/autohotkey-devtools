import { RuleName, StyleName } from '../../../src/constants';
import type { ScopeName } from '../../../src/types';
import { name } from '../../../src/utils';
import type { ExpectedTestData } from '../../types';

export function createRequiresStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      `#Requires AutoHotkey v2.1 ; inline comment`,
      [
        { text: '#Requires', scopes: name(scopeName, RuleName.DirectiveName) },
        { text: 'AutoHotkey', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'v2.1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression';
import { createExpectedData, type Placeholder } from '../helpers';

export function $driveletter(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...[ 'c', 'z' ].flatMap((driveletter): ExpectedTestData[] => {
      return [
        createExpectedData(
          scopeName,
          `${driveletter}:`,
          [ { text: `${driveletter}:`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
        createExpectedData(
          scopeName,
          `${driveletter}\\`,
          [ { text: `${driveletter}\\`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
      ];
    }),
    createExpectedData(
      scopeName,
      `abc:`,
      [ { text: 'abc:', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) } ],
      placeholder,
    ),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInKeywordParameterExpectedDataList(scopeName, placeholder),
  ];
}

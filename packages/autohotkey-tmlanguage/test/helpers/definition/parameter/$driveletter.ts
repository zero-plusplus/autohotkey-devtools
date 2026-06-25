import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference.ts';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

export function $driveletter(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...[ 'c', 'z' ].flatMap((driveletter): ExpectedTestData[] => {
      return [
        createCommandExpectedData(
          scopeName,
          `${driveletter}:`,
          [ { text: `${driveletter}:`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
        createCommandExpectedData(
          scopeName,
          `${driveletter}\\`,
          [ { text: `${driveletter}\\`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
      ];
    }),
    createCommandExpectedData(
      scopeName,
      `abc:`,
      [ { text: 'abc:', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) } ],
      placeholder,
    ),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInKeywordParameterExpectedDataList(scopeName, placeholder),
  ];
}

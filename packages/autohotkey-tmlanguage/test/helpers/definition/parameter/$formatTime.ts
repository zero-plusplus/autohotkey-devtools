import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createDereferenceInUnquotedParameterExpectedDataList } from '../common/dereference.ts';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';
import { keywordOption } from '../option/keywordOption.ts';
import { numberOption } from '../option/numberOption.ts';

export function $formatTime(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    createCommandExpectedData(
      scopeName,
      'yyyy/MM/dd',
      [
        { text: 'yyyy', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '/', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: 'MM', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '/', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: 'dd', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
      ],
      placeholder,
    ),
    ...keywordOption(scopeName, [ 'R' ], placeholder),
    ...numberOption(scopeName, [ 'L', 'D', 'T' ], placeholder),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInUnquotedParameterExpectedDataList(scopeName, placeholder),
  ];
}

import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInUnquotedParameterExpectedDataList } from '../common/dereference';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';
import { keywordOption } from '../option/keywordOption';
import { numberOption } from '../option/numberOption';

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

import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference.ts';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

export function $shouldLabel(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    createCommandExpectedData(
      scopeName,
      'label',
      [ { text: 'label', scopes: name(scopeName, RuleName.LabelName) } ],
      placeholder,
    ),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInKeywordParameterExpectedDataList(scopeName, placeholder),
  ];
}

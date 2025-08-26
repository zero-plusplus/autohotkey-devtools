import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInUnquotedParameterExpectedDataList } from '../common/dereference';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression';
import { createExpectedData, type Placeholder } from '../helpers';

export function $(scopeName: ScopeName, placeholder: Placeholder, additionalExpectedTestDataBuilder = (placeholder: Placeholder): ExpectedTestData[] => ([])): ExpectedTestData[] {
  return [
    createExpectedData(
      scopeName,
      'unquoted',
      [ { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) } ],
      placeholder,
    ),
    ...additionalExpectedTestDataBuilder(placeholder),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInUnquotedParameterExpectedDataList(scopeName, placeholder),
  ];
}

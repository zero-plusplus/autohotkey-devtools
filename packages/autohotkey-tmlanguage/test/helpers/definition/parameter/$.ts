import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression';
import { createExpectedData, type Placeholder } from '../helpers';

export function $(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    createExpectedData(
      scopeName,
      'unquoted',
      [ { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) } ],
      placeholder,
    ),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInKeywordParameterExpectedDataList(scopeName, placeholder),
  ];
}

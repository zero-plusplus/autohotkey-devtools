import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInUnquotedParameterExpectedDataList } from '../common/dereference';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

export function $(scopeName: ScopeName, placeholder: CommandPlaceholder, additionalExpectedTestDataBuilder = (placeholder: CommandPlaceholder): ExpectedTestData[] => ([])): ExpectedTestData[] {
  return [
    createCommandExpectedData(
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

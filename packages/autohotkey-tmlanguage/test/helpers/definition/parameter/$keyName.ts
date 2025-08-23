import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference';
import { createKeywordInvalidExpectedDataList } from '../common/invalid';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression';
import { createExpectedData, type Placeholder } from '../helpers';

export function $keyName(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    createExpectedData(
      scopeName,
      `Shift`,
      [ { text: 'Shift', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
      placeholder,
    ),
    createExpectedData(
      scopeName,
      `vkAB`,
      [ { text: 'vkAB', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
      placeholder,
    ),
    createExpectedData(
      scopeName,
      `SC123`,
      [ { text: 'SC123', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
      placeholder,
    ),
    createExpectedData(
      scopeName,
      `VKABSC123`,
      [ { text: 'VKABSC123', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) } ],
      placeholder,
    ),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInKeywordParameterExpectedDataList(scopeName, placeholder),
    ...createKeywordInvalidExpectedDataList(scopeName, placeholder),
  ];
}

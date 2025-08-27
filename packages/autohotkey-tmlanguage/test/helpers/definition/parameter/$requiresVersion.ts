import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInUnquotedParameterExpectedDataList } from '../common/dereference';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression';
import { createExpectedData, type Placeholder } from '../helpers';

export function $requiresVersion(scopeName: ScopeName, placeholder: Placeholder, additionalExpectedTestDataBuilder = (placeholder: Placeholder): ExpectedTestData[] => ([])): ExpectedTestData[] {
  return [
    createExpectedData(
      scopeName,
      `version`,
      [ { text: 'version', scopes: name(scopeName, RuleName.UnquotedString) } ],
      placeholder,
    ),
    createExpectedData(
      scopeName,
      `AutoHotkey v2.1`,
      [
        { text: 'AutoHotkey', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'v2.1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
      ],
      placeholder,
    ),
    createExpectedData(
      scopeName,
      `AutoHotkey v2.1 64-bit`,
      [
        { text: 'AutoHotkey', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'v2.1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '64-bit', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
      ],
      placeholder,
    ),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInUnquotedParameterExpectedDataList(scopeName, placeholder),
  ];
}

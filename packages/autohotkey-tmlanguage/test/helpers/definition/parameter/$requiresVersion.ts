import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInUnquotedParameterExpectedDataList } from '../common/dereference';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

export function $requiresVersion(scopeName: ScopeName, placeholder: CommandPlaceholder, additionalExpectedTestDataBuilder = (placeholder: CommandPlaceholder): ExpectedTestData[] => ([])): ExpectedTestData[] {
  return [
    createCommandExpectedData(
      scopeName,
      `version`,
      [ { text: 'version', scopes: name(scopeName, RuleName.UnquotedString) } ],
      placeholder,
    ),
    createCommandExpectedData(
      scopeName,
      `AutoHotkey v2.1`,
      [
        { text: 'AutoHotkey', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'v2.1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
      ],
      placeholder,
    ),
    createCommandExpectedData(
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

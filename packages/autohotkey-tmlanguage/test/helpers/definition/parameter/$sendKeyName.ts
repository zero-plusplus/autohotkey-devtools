import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createDereferenceInUnquotedParameterExpectedDataList } from '../common/dereference.ts';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

export function $sendKeyName(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    createCommandExpectedData(
      scopeName,
      `^+!#a ^+!#{a}`,
      [
        { text: '^+!#a', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },

        { text: '^+!#', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '{', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'a', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '}', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
      ],
      placeholder,
    ),
    createCommandExpectedData(
      scopeName,
      `{Shift Down}{a}{Shift Up}`,
      [
        { text: '{', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'Shift', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'Down}', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },

        { text: '{', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'a', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '}', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },

        { text: '{', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'Shift', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'Up}', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
      ],
      placeholder,
    ),
    createCommandExpectedData(
      scopeName,
      `\`,`,
      [ { text: '`,', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) } ],
      placeholder,
    ),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInUnquotedParameterExpectedDataList(scopeName, placeholder),
  ];
}

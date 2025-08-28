import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInUnquotedParameterExpectedDataList } from '../common/dereference';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

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

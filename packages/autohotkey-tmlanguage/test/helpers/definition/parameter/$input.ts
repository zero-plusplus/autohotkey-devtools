import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

export function $input(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    createCommandExpectedData(
      scopeName,
      `input`,
      [ { text: 'input', scopes: name(scopeName, RuleName.Variable) } ],
      placeholder,
    ),
    createCommandExpectedData(
      scopeName,
      `f()`,
      [
        { text: 'f', scopes: name(scopeName, RuleName.Variable) },
        { text: '()', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
      ],
      placeholder,
    ),
    createCommandExpectedData(
      scopeName,
      `% input`,
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
      ],
      placeholder,
    ),
    createCommandExpectedData(
      scopeName,
      `%input%`,
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
      placeholder,
    ),
    createCommandExpectedData(
      scopeName,
      `%in%p%ut%`,
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'in', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'p', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: 'ut', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
      placeholder,
    ),
    ...createDereferenceInKeywordParameterExpectedDataList(scopeName, placeholder),
  ];
}

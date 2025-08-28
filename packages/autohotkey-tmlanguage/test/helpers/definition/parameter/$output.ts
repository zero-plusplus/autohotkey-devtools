import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

export function $output(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    createCommandExpectedData(
      scopeName,
      `output`,
      [ { text: 'output', scopes: name(scopeName, RuleName.Variable) } ],
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
      `% output`,
      [ { text: '% output', scopes: name(scopeName, RuleName.PercentExpressionBegin, StyleName.Invalid) } ],
      placeholder,
    ),
    createCommandExpectedData(
      scopeName,
      `%output%`,
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'output', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
      placeholder,
    ),
    createCommandExpectedData(
      scopeName,
      `%ou%t%put%`,
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'ou', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 't', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: 'put', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
      placeholder,
    ),
    ...createDereferenceInKeywordParameterExpectedDataList(scopeName, placeholder),
  ];
}

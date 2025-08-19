import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference';
import { createExpectedData, type Placeholder } from '../helpers';

export function $output(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    createExpectedData(
      scopeName,
      `output`,
      [ { text: 'output', scopes: name(scopeName, RuleName.Variable) } ],
      placeholder,
    ),
    createExpectedData(
      scopeName,
      `f()`,
      [
        { text: 'f', scopes: name(scopeName, RuleName.Variable) },
        { text: '()', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
      ],
      placeholder,
    ),
    createExpectedData(
      scopeName,
      `% output`,
      [ { text: '% output', scopes: name(scopeName, RuleName.PercentExpressionBegin, StyleName.Invalid) } ],
      placeholder,
    ),
    createExpectedData(
      scopeName,
      `%output%`,
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'output', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
      placeholder,
    ),
    createExpectedData(
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

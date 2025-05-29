import { RuleName, StyleName } from '../../../../src/constants';
import { name } from '../../../../src/tmlanguage';
import type { ScopeName } from '../../../../src/types';
import type { ExpectedTestData } from '../../../types';

export function createDereferenceExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      '%abc%', [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
    ],
    [
      '%A_ScriptDir%',
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'A_ScriptDir', scopes: name(scopeName, RuleName.BuiltInVariable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
    ],
    [
      '%%', [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin, StyleName.Invalid) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd, StyleName.Invalid) },
      ],
    ],
    [
      '%a', [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
      ],
    ],
    [
      '%a %', [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
    ],
    [
      '%a b c %', [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: 'c', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
    ],
  ];
}

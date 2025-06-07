import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName, StyleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createDereferenceExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        %abc%       ; comment
      `,
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
    [
      dedent`
        %A_ScriptDir%       ; comment
      `,
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'A_ScriptDir', scopes: name(scopeName, RuleName.BuiltInVariable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
    [
      dedent`
        %%        ; comment
      `,
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin, StyleName.Invalid) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
    [
      dedent`
        %a          ; comment
      `,
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
    [
      dedent`
        %a %        ; comment
      `,
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
    [
      dedent`
        %a b c %        ; comment
      `,
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: 'c', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

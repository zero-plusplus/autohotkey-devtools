import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import * as common from '../../../common/expression/object';
import type { ExpectedTestData } from '../../../types';

export function createObjectLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createObjectLiteralExpectedData(scopeName),

    [
      dedent`
        var := { %a + b%: 123 }
      `,
      [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: '+', scopes: name(scopeName, RuleName.Operator) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
      ],
    ],
  ];
}

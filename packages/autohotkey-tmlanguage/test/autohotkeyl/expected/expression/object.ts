import { dedent } from '@zero-plusplus/utilities/src';
import {
  name,
  RuleName,
  StyleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import * as common from '../../../common/expression/object';
import type { ExpectedTestData } from '../../../types';

export function createObjectLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createObjectLiteralExpectedData(scopeName),

    [
      dedent`
        abc := { %key%: 1 }                ; comment
      `,
      [
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: '%key%', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

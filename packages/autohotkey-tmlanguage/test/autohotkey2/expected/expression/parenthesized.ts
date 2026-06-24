import { dedent } from '@zero-plusplus/utilities/src/index.ts';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage.ts';
import * as common from '../../../common/expression/parenthesized.ts';
import type { ExpectedTestData } from '../../../types.ts';

export function createParenthesizedExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createParenthesizedExpressionExpectedData(scopeName),

    [
      dedent`
        (             ; comment
          a + b       ; comment
        )             ; comment
      `,
      [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: '+', scopes: name(scopeName, RuleName.Operator) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

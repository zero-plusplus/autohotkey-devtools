import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createParenthesizedExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        (var)         ; comment
        (a + b)       ; comment
      `,
      [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: '+', scopes: name(scopeName, RuleName.Operator) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

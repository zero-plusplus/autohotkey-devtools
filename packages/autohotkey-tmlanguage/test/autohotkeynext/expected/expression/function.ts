import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createFunctionExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        XXX(() {          ; comment
        })                ; comment

        XXX(YYY() {       ; comment
        })                ; comment
      `,
      [
        ...[
          { text: 'XXX', scopes: name(scopeName, RuleName.FunctionName) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
        ],

        ...[
          { text: 'XXX', scopes: name(scopeName, RuleName.FunctionName) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: 'YYY', scopes: name(scopeName, RuleName.FunctionName) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
        ],
      ],
    ],
  ];
}

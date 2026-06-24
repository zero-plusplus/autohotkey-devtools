import { dedent } from '@zero-plusplus/utilities/src/index.ts';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';

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
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],

        ...[
          { text: 'XXX', scopes: name(scopeName, RuleName.FunctionName) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: 'YYY', scopes: name(scopeName, RuleName.FunctionName) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],
      ],
    ],
  ];
}

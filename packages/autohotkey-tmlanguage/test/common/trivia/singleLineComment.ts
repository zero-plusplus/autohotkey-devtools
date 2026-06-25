import { dedent } from '@zero-plusplus/utilities/src/index.ts';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../types.ts';

export function createSingleLineCommentExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        ; comment
      `,
      [ { text: '; comment', scopes: name(scopeName, RuleName.SingleLineComment) } ],
    ],
    [
      dedent`
        (abc) ; comment
      `,
      [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

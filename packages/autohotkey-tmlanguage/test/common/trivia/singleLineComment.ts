import { RuleName } from '../../../src/constants';
import { name } from '../../../src/tmlanguage';
import type { ScopeName } from '../../../src/types';
import type { ExpectedTestData } from '../../types';

export function createSingleLineCommentExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [ '; comment', [ { text: '; comment', scopes: name(scopeName, RuleName.SingleLineComment) } ] ],
    [
      '(abc) ; comment', [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

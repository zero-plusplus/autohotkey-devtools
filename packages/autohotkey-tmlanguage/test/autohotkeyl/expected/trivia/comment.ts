import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createCommentExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [ '; comment', [ { text: '; comment', scopes: name(scopeName, RuleName.SingleLineComment) } ] ],
    [
      'abc ; comment', [
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

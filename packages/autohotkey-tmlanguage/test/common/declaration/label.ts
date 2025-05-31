import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createLabelStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        abc_123:       ; comment
      `,
      [
        { text: 'abc_123', scopes: name(scopeName, RuleName.LabelName) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
    [
      dedent`
        123_abc:       ; comment
      `,
      [
        { text: '123_abc', scopes: name(scopeName, RuleName.LabelName) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

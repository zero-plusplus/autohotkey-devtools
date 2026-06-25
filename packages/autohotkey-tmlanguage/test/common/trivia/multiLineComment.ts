import { dedent } from '@zero-plusplus/utilities/src/index.ts';
import {
  name,
  RuleDescriptor,
  RuleName,
  type ScopeName,
} from '../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../types.ts';

export function createMultiLineCommentExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        /* 1-line
         * 2-line
         */
      `,
      [
        { text: '/*', scopes: name(scopeName, RuleName.MultiLineComment, RuleDescriptor.Begin) },
        { text: ' 1-line', scopes: name(scopeName, RuleName.MultiLineComment) },
        { text: ' * 2-line', scopes: name(scopeName, RuleName.MultiLineComment) },
        { text: '*/', scopes: name(scopeName, RuleName.MultiLineComment, RuleDescriptor.End) },
      ],
    ],
  ];
}

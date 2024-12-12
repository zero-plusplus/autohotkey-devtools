import { dedent } from '@zero-plusplus/utilities/src';
import { RuleDescriptor, RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

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

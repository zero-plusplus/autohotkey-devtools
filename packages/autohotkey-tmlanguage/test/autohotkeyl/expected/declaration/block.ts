import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createBlockDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        {
          if true {
          }
        }
      `,
      [
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: 'if', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
  ];
}

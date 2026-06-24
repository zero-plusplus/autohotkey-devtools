import { dedent } from '@zero-plusplus/utilities/src/index.ts';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';

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

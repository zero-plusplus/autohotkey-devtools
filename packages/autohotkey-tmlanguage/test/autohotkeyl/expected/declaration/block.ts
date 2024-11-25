import { dedent } from '@zero-plusplus/utilities/src';
import { Repository, RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createBlockDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        {
          AutoTrim
        }
      `,
      [
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: 'AutoTrim', scopes: name(scopeName, Repository.CommandStatement, RuleName.CommandName) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
  ];
}

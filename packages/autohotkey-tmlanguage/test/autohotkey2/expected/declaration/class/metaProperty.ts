import { dedent, repeatArray } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../../src/constants';
import type { ScopeName } from '../../../../../src/types';
import { name } from '../../../../../src/utils';
import type { ExpectedTestData } from '../../../../types';

export function createMetaPropertyDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
          class {
            __ITEM {
            }
            __ITEM
            {
            }
            __ITEM[] {
            }
          }
        `, [
        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },

        ...repeatArray(2, [
          { text: '__ITEM', scopes: name(scopeName, RuleName.MetaFunctionName) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),

        { text: '__ITEM', scopes: name(scopeName, RuleName.MetaFunctionName) },
        { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
        { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
      ],
    ],
  ];
}

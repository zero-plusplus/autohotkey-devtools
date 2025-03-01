import { dedent, repeatArray } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createPropertyDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        class {
          property {
            get {
            }
            set {
            }
          }
          property
          {
            get
            {
            }
            set
            {
            }
          }
        }
      `,
      [
        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },

        ...repeatArray(2, [
          { text: 'property', scopes: name(scopeName, RuleName.Variable) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: 'get', scopes: name(scopeName, RuleName.GetSetKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: 'set', scopes: name(scopeName, RuleName.GetSetKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),

        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
      ],
    ],
    [
      dedent`
        class {
          PROPERTY {
          }
          PROPERTY
          {
          }
        }
      `,
      [
        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },

        ...repeatArray(2, [
          { text: 'PROPERTY', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),

        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
      ],
    ],
    [
      dedent`
        class {
          property[] {
            get {
            }
            set {
            }
          }
          property[]
          {
            get
            {
            }
            set
            {
            }
          }
        }
      `,
      [
        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },

        ...repeatArray(2, [
          { text: 'property', scopes: name(scopeName, RuleName.Variable) },
          { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
          { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: 'get', scopes: name(scopeName, RuleName.GetSetKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: 'set', scopes: name(scopeName, RuleName.GetSetKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),

        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
      ],
    ],
  ];
}

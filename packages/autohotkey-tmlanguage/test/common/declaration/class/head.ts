import { dedent, repeatArray } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createClassHeadDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        class {
        }
        class
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        ]),
      ],
    ],
    [
      dedent`
        class A {
        }
        class A
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
          { text: 'A', scopes: name(scopeName, RuleName.ClassName) },
          { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        ]),
      ],
    ],
    [
      dedent`
        class A extends B {
        }
        class A extends B
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
          { text: 'A', scopes: name(scopeName, RuleName.ClassName) },
          { text: 'extends', scopes: name(scopeName, RuleName.ExtendsKeyword) },
          { text: 'B', scopes: name(scopeName, RuleName.ClassName) },
          { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        ]),
      ],
    ],
    [
      dedent`
        class A extends B.C {
        }
        class A extends B.C
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
          { text: 'A', scopes: name(scopeName, RuleName.ClassName) },
          { text: 'extends', scopes: name(scopeName, RuleName.ExtendsKeyword) },
          { text: 'B', scopes: name(scopeName, RuleName.ClassName) },
          { text: '.', scopes: name(scopeName, RuleName.Dot) },
          { text: 'C', scopes: name(scopeName, RuleName.ClassName) },
          { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        ]),
      ],
    ],

    // Nested class
    [
      dedent`
        class {
          class {
          }
        }
      `,
      [
        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
      ],
    ],
  ];
}

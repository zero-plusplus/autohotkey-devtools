import { dedent } from '@zero-plusplus/utilities/src';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createClassHeadDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // one true brace style
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            class {       ; comment
            }             ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            class A {    ; comment
            }            ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: 'A', scopes: name(scopeName, RuleName.ClassName) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            class A extends B {     ; comment
            }                       ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: 'A', scopes: name(scopeName, RuleName.ClassName) },
            { text: 'extends', scopes: name(scopeName, RuleName.ExtendsKeyword) },
            { text: 'B', scopes: name(scopeName, RuleName.ClassName) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            class A extends B.C {       ; comment
            }                           ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: 'A', scopes: name(scopeName, RuleName.ClassName) },
            { text: 'extends', scopes: name(scopeName, RuleName.ExtendsKeyword) },
            { text: 'B', scopes: name(scopeName, RuleName.ClassName) },
            { text: '.', scopes: name(scopeName, RuleName.Dot) },
            { text: 'C', scopes: name(scopeName, RuleName.ClassName) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // K&R style
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            class         ; comment
            {             ; comment
            }             ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            class A      ; comment
            {            ; comment
            }            ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: 'A', scopes: name(scopeName, RuleName.ClassName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            class A extends B     ; comment
            {                     ; comment
            }                     ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: 'A', scopes: name(scopeName, RuleName.ClassName) },
            { text: 'extends', scopes: name(scopeName, RuleName.ExtendsKeyword) },
            { text: 'B', scopes: name(scopeName, RuleName.ClassName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            class A extends B.C       ; comment
            {                         ; comment
            }                         ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: 'A', scopes: name(scopeName, RuleName.ClassName) },
            { text: 'extends', scopes: name(scopeName, RuleName.ExtendsKeyword) },
            { text: 'B', scopes: name(scopeName, RuleName.ClassName) },
            { text: '.', scopes: name(scopeName, RuleName.Dot) },
            { text: 'C', scopes: name(scopeName, RuleName.ClassName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // nested class
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            class {         ; comment
              class {       ; comment
              }             ; comment
            }               ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),
  ];
}

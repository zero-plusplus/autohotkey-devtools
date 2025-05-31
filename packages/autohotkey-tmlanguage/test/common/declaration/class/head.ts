import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName, StyleName,
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
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
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
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
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
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
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
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
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
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
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
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
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
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
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
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
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
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    })(),

    // invalid
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            class                   ; comment
              A                     ; comment
                extends             ; comment
                  B.C               ; comment
                                    ; comment
              func() {              ; comment
              }                     ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'A', scopes: name(scopeName, RuleName.Unknown, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'extends', scopes: name(scopeName, RuleName.Unknown, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'B.C', scopes: name(scopeName, RuleName.Unknown, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'func()', scopes: name(scopeName, RuleName.Unknown, StyleName.Invalid) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    })(),
  ];
}

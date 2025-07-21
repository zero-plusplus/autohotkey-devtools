import { dedent } from '@zero-plusplus/utilities/src';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createPropertyDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...((): ExpectedTestData[] => {
      return [
        // one true brace style
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                class {           ; comment
                  property {      ; comment
                    get {         ; comment
                    }             ; comment
                    set {         ; comment
                    }             ; comment
                  }               ; comment
                }                 ; comment
              `,
              [
                { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'property', scopes: name(scopeName, RuleName.Variable) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'get', scopes: name(scopeName, RuleName.GetSetKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'set', scopes: name(scopeName, RuleName.GetSetKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                Class {               ; comment
                  Property {          ; comment
                    Get {             ; comment
                    }                 ; comment
                    Set {             ; comment
                    }                 ; comment
                  }                   ; comment
                }                     ; comment
              `,
              [
                { text: 'Class', scopes: name(scopeName, RuleName.ClassKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'Property', scopes: name(scopeName, RuleName.Variable) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'Get', scopes: name(scopeName, RuleName.GetSetKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'Set', scopes: name(scopeName, RuleName.GetSetKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                CLASS {               ; comment
                  PROPERTY {          ; comment
                    GET {             ; comment
                    }                 ; comment
                    SET {             ; comment
                    }                 ; comment
                  }                   ; comment
                }                     ; comment
              `,
              [
                { text: 'CLASS', scopes: name(scopeName, RuleName.ClassKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'PROPERTY', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'GET', scopes: name(scopeName, RuleName.GetSetKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'SET', scopes: name(scopeName, RuleName.GetSetKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                class {                 ; comment
                  property[] {          ; comment
                    get {               ; comment
                    }                   ; comment
                    set {               ; comment
                    }                   ; comment
                  }                     ; comment
                }                       ; comment
              `,
              [
                { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'property', scopes: name(scopeName, RuleName.Variable) },
                { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
                { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'get', scopes: name(scopeName, RuleName.GetSetKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'set', scopes: name(scopeName, RuleName.GetSetKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                class {                 ; comment
                  property[             ; comment
                    key                 ; comment
                  ] {                   ; comment
                    get {               ; comment
                    }                   ; comment
                    set {               ; comment
                    }                   ; comment
                  }                     ; comment
                }                       ; comment
              `,
              [
                { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'property', scopes: name(scopeName, RuleName.Variable) },
                { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'key', scopes: name(scopeName, RuleName.Variable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'get', scopes: name(scopeName, RuleName.GetSetKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'set', scopes: name(scopeName, RuleName.GetSetKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
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
                class             ; comment
                {                 ; comment
                  property        ; comment
                  {               ; comment
                    get           ; comment
                    {             ; comment
                    }             ; comment
                    set           ; comment
                    {             ; comment
                    }             ; comment
                  }               ; comment
                }                 ; comment
              `,
              [
                { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'property', scopes: name(scopeName, RuleName.Variable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'get', scopes: name(scopeName, RuleName.GetSetKeyword) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'set', scopes: name(scopeName, RuleName.GetSetKeyword) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                class                     ; comment
                {                         ; comment
                  PROPERTY                ; comment
                  {                       ; comment
                  }                       ; comment
                }                         ; comment
              `,
              [
                { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'PROPERTY', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                class                     ; comment
                {                         ; comment
                  property[]              ; comment
                  {                       ; comment
                    get                   ; comment
                    {                     ; comment
                    }                     ; comment
                    set                   ; comment
                    {                     ; comment
                    }                     ; comment
                  }                       ; comment
                }                         ; comment
              `,
              [
                { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'property', scopes: name(scopeName, RuleName.Variable) },
                { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
                { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'get', scopes: name(scopeName, RuleName.GetSetKeyword) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: 'set', scopes: name(scopeName, RuleName.GetSetKeyword) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
          ];
        })(),
      ];
    })(),
  ];
}

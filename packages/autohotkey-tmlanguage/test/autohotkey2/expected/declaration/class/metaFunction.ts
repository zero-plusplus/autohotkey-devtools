import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';

export function createMetaFunctionDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...[ '__NEW', '__DELETE', '__ENUM', '__GET', '__SET', '__CALL' ].flatMap((metaFunctionName): ExpectedTestData[] => {
      return [
        [
          dedent`
            class {                                     ; comment
              ${metaFunctionName}(a, b := 123, c*) {    ; comment
              }                                         ; comment
            }                                           ; comment
          `, [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: metaFunctionName, scopes: name(scopeName, RuleName.MetaFunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: 'a', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'b', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'c', scopes: name(scopeName, RuleName.Variable) },
            { text: '*', scopes: name(scopeName, RuleName.Operator) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
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
            class {                                     ; comment
              ${metaFunctionName}(                      ; comment
                  a,                                    ; comment
                  b := 123                              ; comment
                  , c*                                  ; comment
                ) {                                     ; comment
              }                                         ; comment
            }                                           ; comment
          `, [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: metaFunctionName, scopes: name(scopeName, RuleName.MetaFunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'a', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'b', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'c', scopes: name(scopeName, RuleName.Variable) },
            { text: '*', scopes: name(scopeName, RuleName.Operator) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
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
            class {                                     ; comment
              ${metaFunctionName}(a, b := 123, c*)      ; comment
              {                                         ; comment
              }                                         ; comment
            }                                           ; comment
          `, [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: metaFunctionName, scopes: name(scopeName, RuleName.MetaFunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: 'a', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'b', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'c', scopes: name(scopeName, RuleName.Variable) },
            { text: '*', scopes: name(scopeName, RuleName.Operator) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    }),
  ];
}

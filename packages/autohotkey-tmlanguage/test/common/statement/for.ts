import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createForStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // one true brace style
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            for key, value in obj {     ; comment
            }                           ; comment
          `,
          [
            { text: 'for', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'value', scopes: name(scopeName, RuleName.Variable) },
            { text: 'in', scopes: name(scopeName, RuleName.KeywordInExpression) },
            { text: 'obj', scopes: name(scopeName, RuleName.Variable) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            for, key, value in obj {        ; comment
            }                               ; comment
          `,
          [
            { text: 'for', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'value', scopes: name(scopeName, RuleName.Variable) },
            { text: 'in', scopes: name(scopeName, RuleName.KeywordInExpression) },
            { text: 'obj', scopes: name(scopeName, RuleName.Variable) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            for, key, value, extra1, extra2 in obj {        ; comment
            }                                               ; comment
          `,
          [
            { text: 'for', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'value', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'extra1', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'extra2', scopes: name(scopeName, RuleName.Variable) },
            { text: 'in', scopes: name(scopeName, RuleName.KeywordInExpression) },
            { text: 'obj', scopes: name(scopeName, RuleName.Variable) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
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
            for key, value in obj             ; comment
            {                                 ; comment
            }                                 ; comment
          `,
          [
            { text: 'for', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'value', scopes: name(scopeName, RuleName.Variable) },
            { text: 'in', scopes: name(scopeName, RuleName.KeywordInExpression) },
            { text: 'obj', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            for, key, value in obj        ; comment
            {                             ; comment
            }                             ; comment
          `,
          [
            { text: 'for', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'value', scopes: name(scopeName, RuleName.Variable) },
            { text: 'in', scopes: name(scopeName, RuleName.KeywordInExpression) },
            { text: 'obj', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    })(),
  ];
}

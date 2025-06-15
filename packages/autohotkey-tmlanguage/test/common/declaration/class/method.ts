import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createMethodDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // Highlight as a function name even if it has the same name as a built-in class
    [
      dedent`
        class {           ; comment
          map() {         ; comment
          }               ; comment
        }                 ; comment
      `,
      [
        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'map', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

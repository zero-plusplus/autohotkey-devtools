import { dedent } from '@zero-plusplus/utilities/src';
import {
  name,
  RuleName,
  StyleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createHotstringLabelStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        :*?0?B0bC1C0cK10k-1O0oP1p-1R0rSISPSETXZ:abc::text     ; comment
      `,
      [
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '*', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '?0', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '?', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'B0', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'b', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'C1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'C0', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'c', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'K10', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'k-1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'O0', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'o', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'P1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'p-1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'R0', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'r', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'SI', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'SP', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'SE', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'T', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'X', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'Z', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'abc', scopes: name(scopeName, RuleName.HotstringLabelName) },
        { text: '::', scopes: name(scopeName, RuleName.ColonColon) },
        { text: 'text', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ::abc::       ; comment
          return      ; comment
      `,
      [
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'abc', scopes: name(scopeName, RuleName.HotstringLabelName) },
        { text: '::', scopes: name(scopeName, RuleName.ColonColon) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'return', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ::abc::       ; comment
        {             ; comment
          return      ; comment
        }             ; comment
      `,
      [
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'abc', scopes: name(scopeName, RuleName.HotstringLabelName) },
        { text: '::', scopes: name(scopeName, RuleName.ColonColon) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'return', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ::abc::         ; comment
          abc(){        ; comment
            return      ; comment
          }             ; comment
      `,
      [
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'abc', scopes: name(scopeName, RuleName.HotstringLabelName) },
        { text: '::', scopes: name(scopeName, RuleName.ColonColon) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'abc', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'return', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

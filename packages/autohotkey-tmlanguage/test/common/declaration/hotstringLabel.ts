import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName, StyleName,
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
        { text: '*', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: '?0', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: '?', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'B0', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'b', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'C1', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'C0', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'c', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'K10', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'k-1', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'O0', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'o', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'P1', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'p-1', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'R0', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'r', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'SI', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'SP', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'SE', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'T', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'X', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: 'Z', scopes: name(scopeName, RuleName.HotstringOption, StyleName.Strong) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'abc', scopes: name(scopeName, RuleName.HotstringLabelName) },
        { text: '::', scopes: name(scopeName, RuleName.ColonColon) },
        { text: 'text', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
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
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'return', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
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
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'return', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
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
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'abc', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'return', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

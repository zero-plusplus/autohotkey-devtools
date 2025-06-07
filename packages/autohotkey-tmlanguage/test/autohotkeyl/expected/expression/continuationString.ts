import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName, StyleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createContinuationStringLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        (LTrim xxx                  ; comment
          1-line                    ; text
          2-line                    ; text
        )                           ; comment
      `, [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'LTrim', scopes: name(scopeName, RuleName.ContinuationOption, StyleName.Strong) },
        { text: 'xxx', scopes: name(scopeName, RuleName.ContinuationOption, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '1-line                    ; text', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '2-line                    ; text', scopes: name(scopeName, RuleName.UnquotedString) },

        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

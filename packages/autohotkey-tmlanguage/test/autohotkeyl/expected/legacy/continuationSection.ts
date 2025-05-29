import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName, StyleName } from '../../../../src/constants';
import { name } from '../../../../src/tmlanguage';
import type { ScopeName } from '../../../../src/types';
import type { ExpectedTestData } from '../../../types';

export function createContinuationSectionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        (
          text
        )
      `, [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'text', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],
    [
      dedent`
        (Join\`r\`n
        )
        (Join|
        )
      `, [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'Join`r`n', scopes: name(scopeName, RuleName.ContinuationOption, StyleName.Strong) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'Join|', scopes: name(scopeName, RuleName.ContinuationOption, StyleName.Strong) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],
    [
      dedent`
        (           ; comment
        ), text     ; comment
      `, [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'text', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    [
      dedent`
        (:
        )
      `, [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ':', scopes: name(scopeName, RuleName.ContinuationOption, StyleName.Invalid) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],
  ];
}

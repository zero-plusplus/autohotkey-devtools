import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
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
  ];
}

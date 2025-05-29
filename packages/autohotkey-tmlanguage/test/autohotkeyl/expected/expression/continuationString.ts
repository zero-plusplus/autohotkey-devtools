import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName, StyleName } from '../../../../src/constants';
import { name } from '../../../../src/tmlanguage';
import type { ScopeName } from '../../../../src/types';
import type { ExpectedTestData } from '../../../types';

export function createContinuationStringLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        (LTrim
          1-line
          2-line
        )
      `, [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'LTrim', scopes: name(scopeName, RuleName.ContinuationOption, StyleName.Strong) },
        { text: '1-line', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '2-line', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],
  ];
}

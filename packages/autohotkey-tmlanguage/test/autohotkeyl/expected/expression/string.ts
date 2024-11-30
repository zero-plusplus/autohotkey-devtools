import * as constants_v1 from '../../../../src/autohotkeyl/constants';
import { RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createStringLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      '"string"', [
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringBegin) },
        { text: 'string', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringEnd) },
      ],
    ],

    // #region escape sequences
    [
      `"${constants_v1.doubleQuoteEscapeSequences.join('')}"`, [
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringBegin) },
        ...constants_v1.doubleQuoteEscapeSequences.map((escapeSequence) => {
          return { text: escapeSequence, scopes: name(scopeName, RuleName.DoubleString, StyleName.Escape) };
        }),
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringEnd) },
      ],
    ],
    // #endregion escape sequences
  ];
}

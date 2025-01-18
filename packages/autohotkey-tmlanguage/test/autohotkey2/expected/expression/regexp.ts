import * as constants_v2 from '../../../../src/autohotkey2/constants';
import type { ScopeName } from '../../../../src/types';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createRegExpExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createRegExpExpectedData(scopeName, {
      quote: '"',
      escapedQuoted: '`"',
      escapeSequences: constants_v2.doubleQuoteEscapeSequences,
    }),
    ...common.createRegExpExpectedData(scopeName, {
      quote: `'`,
      escapedQuoted: `\`'`,
      escapeSequences: constants_v2.singleQuoteEscapeSequences,
    }),
  ];
}

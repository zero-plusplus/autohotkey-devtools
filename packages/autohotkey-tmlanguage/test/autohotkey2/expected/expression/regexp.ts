import * as constants_v2 from '../../../../src/autohotkey2/constants';
import * as constants_common from '../../../../src/common/constants';
import type { ScopeName } from '../../../../src/tmlanguage';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createRegExpExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createRegExpExpectedData(scopeName, {
      quote: '"',
      escapedQuoted: '`"',
      regexOptions: constants_common.regexpOptions,
      escapeSequences: constants_v2.doubleQuoteEscapeSequences,
    }),
    ...common.createRegExpExpectedData(scopeName, {
      quote: `'`,
      escapedQuoted: `\`'`,
      regexOptions: constants_common.regexpOptions,
      escapeSequences: constants_v2.singleQuoteEscapeSequences,
    }),
  ];
}

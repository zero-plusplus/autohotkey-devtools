import * as constants_v2 from '../../../../src/autohotkey2/constants.ts';
import * as constants_common from '../../../../src/common/constants.ts';
import type { ScopeName } from '../../../../src/tmlanguage.ts';
import * as common from '../../../common/index.ts';
import type { ExpectedTestData } from '../../../types.ts';

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

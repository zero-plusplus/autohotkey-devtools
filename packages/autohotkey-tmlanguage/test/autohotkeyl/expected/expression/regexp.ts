import * as constants_v1 from '../../../../src/autohotkeyl/constants.ts';
import type { ScopeName } from '../../../../src/tmlanguage.ts';
import * as common from '../../../common/index.ts';
import type { ExpectedTestData } from '../../../types.ts';

export function createRegExpExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createRegExpExpectedData(scopeName, {
      quote: '"',
      escapedQuoted: '""',
      regexOptions: constants_v1.regexpOptions,
      escapeSequences: constants_v1.doubleQuoteEscapeSequences,
    }),
  ];
}

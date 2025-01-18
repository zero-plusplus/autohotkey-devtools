import * as constants_v1 from '../../../../src/autohotkeyl/constants';
import type { ScopeName } from '../../../../src/types';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createRegExpExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return common.createRegExpExpectedData(scopeName, {
    quote: '"',
    escapedQuoted: '""',
    escapeSequences: constants_v1.doubleQuoteEscapeSequences,
  });
}

import * as constants_v2 from '../../../../src/autohotkey2/constants';
import {
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import * as common from '../../../common/expression/string';
import type { ExpectedTestData } from '../../../types';

export function createStringLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createStringLiteralExpectedData(scopeName, {
      ruleName: RuleName.DoubleString,
      quote: '"',
      escapeSequences: constants_v2.doubleQuoteEscapeSequences,
    }),
    ...common.createStringLiteralExpectedData(scopeName, {
      ruleName: RuleName.SingleString,
      quote: `'`,
      escapeSequences: constants_v2.singleQuoteEscapeSequences,
    }),
  ];
}

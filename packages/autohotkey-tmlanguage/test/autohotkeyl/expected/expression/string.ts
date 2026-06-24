import * as constants_v1 from '../../../../src/autohotkeyl/constants.ts';
import {
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage.ts';
import * as common from '../../../common/expression/string.ts';
import type { ExpectedTestData } from '../../../types.ts';

export function createStringLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createStringLiteralExpectedData(scopeName, {
      ruleName: RuleName.DoubleString,
      quote: '"',
      escapeSequences: constants_v1.doubleQuoteEscapeSequences,
    }),
  ];
}

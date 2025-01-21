import * as constants_v1 from '../../../../src/autohotkeyl/constants';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import * as common from '../../../common/expression/string';
import type { ExpectedTestData } from '../../../types';

export function createStringLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  const placeholder = {
    ruleName: RuleName.DoubleString,
    quote: '"',
    escapeSequences: constants_v1.doubleQuoteEscapeSequences,
  };
  return [ ...common.createStringLiteralExpectedData(scopeName, placeholder) ];
}

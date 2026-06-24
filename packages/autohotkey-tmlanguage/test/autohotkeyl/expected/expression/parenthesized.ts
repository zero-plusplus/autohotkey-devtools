import type { ScopeName } from '../../../../src/tmlanguage.ts';
import * as common from '../../../common/expression/parenthesized.ts';
import type { ExpectedTestData } from '../../../types.ts';

export function createParenthesizedExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createParenthesizedExpressionExpectedData(scopeName) ];
}

import type { ScopeName } from '../../../../src/tmlanguage';
import * as common from '../../../common/expression/parenthesized';
import type { ExpectedTestData } from '../../../types';

export function createParenthesizedExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createParenthesizedExpressionExpectedData(scopeName) ];
}

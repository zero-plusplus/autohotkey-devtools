import * as constant_vnext from '../../../../src/autohotkeynext/constants';
import * as constant_common from '../../../../src/common/constants';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createOperatorInExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createOperatorInExpressionExpectedData(scopeName, {
      name: name(scopeName, RuleName.Operator),
      operators: [
        ...constant_common.assignmentOperators,
        ...constant_vnext.expressionOperators,
      ],
    }),
  ];
}

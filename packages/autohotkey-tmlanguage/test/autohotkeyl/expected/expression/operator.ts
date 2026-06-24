import * as constant_v1 from '../../../../src/autohotkeyl/constants.ts';
import * as constant_common from '../../../../src/common/constants.ts';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage.ts';
import * as common from '../../../common/index.ts';
import type { ExpectedTestData } from '../../../types.ts';

export function createOperatorInExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createOperatorInExpressionExpectedData(scopeName, {
      name: name(scopeName, RuleName.Operator),
      operators: [
        ...constant_common.assignmentOperators,
        ...constant_v1.expressionOperators,
      ],
    }),
    ...common.createOperatorInExpressionExpectedData(scopeName, {
      name: name(scopeName, RuleName.KeywordInExpression),
      operators: [ ...constant_common.expressionKeywords ],
    }),
  ];
}

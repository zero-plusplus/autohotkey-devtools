import * as constant_v2 from '../../../../src/autohotkey2/constants';
import * as constant_common from '../../../../src/common/constants';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createOperatorInExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createOperatorInExpressionExpectedData(scopeName, {
      name: name(scopeName, RuleName.Operator),
      operators: [
        ...constant_common.assignmentOperators,
        ...constant_v2.expressionOperators,
      ],
    }),
    ...common.createOperatorInExpressionExpectedData(scopeName, {
      name: name(scopeName, RuleName.KeywordInExpression),
      operators: [ ...constant_v2.expressionKeywords ],
    }),
  ];
}

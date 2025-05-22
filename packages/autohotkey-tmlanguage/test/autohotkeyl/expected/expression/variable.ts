import * as constants_v1 from '../../../../src/autohotkeyl/constants';
import { RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import * as common from '../../../common/expression/variable';
import type { ExpectedTestData } from '../../../types';

export function createVariableExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createVariableExpectedData(scopeName, {
      ruleName: RuleName.KeywordLikeBuiltInVariable,
      variables: constants_v1.keywordLikeBuiltinVariables,
    }),
    ...common.createVariableExpectedData(scopeName, {
      ruleName: RuleName.BuiltInVariable,
      variables: constants_v1.builtinVaribles,
    }),
    ...common.createVariableExpectedData(scopeName, {
      ruleName: RuleName.Variable,
      variables: [
        '$',
        '#',
        '@',
        'var',
        '$#@_var123',
        'v'.repeat(253),
      ],
    }),
    ...common.createVariableExpectedData(scopeName, {
      ruleName: RuleName.ConstantLikeVariable,
      variables: [
        'VAR',
        'VAR_VAR',
        'V'.repeat(253),
      ],
    }),

    // invalid
    [
      `(${'v'.repeat(255)})`, [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'v'.repeat(253), scopes: name(scopeName, RuleName.Variable) },
        { text: 'v'.repeat(2), scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],
  ];
}

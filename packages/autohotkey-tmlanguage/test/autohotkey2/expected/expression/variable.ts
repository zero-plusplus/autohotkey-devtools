import * as constants_v2 from '../../../../src/autohotkey2/constants';
import { RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import * as common from '../../../common/expression/variable';
import type { ExpectedTestData } from '../../../types';

export function createVariableExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createVariableExpectedData(scopeName, {
      ruleName: RuleName.KeywordLikeBuiltInVariable,
      variables: constants_v2.keywordLikeBuiltinVariables,
    }),
    ...common.createVariableExpectedData(scopeName, {
      ruleName: RuleName.BuiltInVariable,
      variables: constants_v2.builtinVaribles,
    }),
    ...common.createVariableExpectedData(scopeName, {
      ruleName: RuleName.Variable,
      variables: [
        'var',
        '_var123',
        'v'.repeat(253),
      ],
    }),

    // invalid
    [
      'v'.repeat(255), [
        { text: 'v'.repeat(253), scopes: name(scopeName, RuleName.Variable) },
        { text: 'v'.repeat(2), scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
      ],
    ],
    [
      '12abc', [
        { text: '12', scopes: name(scopeName, RuleName.Variable, RuleName.Integer, StyleName.Invalid) },
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
      ],
    ],
  ];
}

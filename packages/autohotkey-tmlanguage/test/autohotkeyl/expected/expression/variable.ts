import * as constants_v1 from '../../../../src/autohotkeyl/constants';
import { RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createVariableExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...constants_v1.keywordLikeBuiltinVariables.map((variable): ExpectedTestData => {
      return [ variable, [ { text: variable, scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) } ] ];
    }),
    ...constants_v1.builtinVaribles.map((variable): ExpectedTestData => {
      return [ variable, [ { text: variable, scopes: name(scopeName, RuleName.BuiltInVariable) } ] ];
    }),

    [ 'var', [ { text: 'var', scopes: name(scopeName, RuleName.Variable) } ] ],
    [ '$#@_var123', [ { text: '$#@_var123', scopes: name(scopeName, RuleName.Variable) } ] ],
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

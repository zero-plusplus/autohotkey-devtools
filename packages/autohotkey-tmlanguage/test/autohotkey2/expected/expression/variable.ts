import * as constants_v2 from '../../../../src/autohotkey2/constants';
import { RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import * as common from '../../../common/expression/variable';
import type { ExpectedTestData } from '../../../types';

interface Placeholder {
  keywordLikeBuiltinVariables: readonly string[];
  builtinVaribles: readonly string[];
  builtInClassNames: readonly string[];
}
export function createVariableExpectedData(scopeName: ScopeName, placeholder?: Placeholder): ExpectedTestData[] {
  return [
    ...common.createVariableExpectedData(scopeName, {
      ruleName: RuleName.KeywordLikeBuiltInVariable,
      variables: placeholder?.keywordLikeBuiltinVariables ?? constants_v2.keywordLikeBuiltinVariables,
    }),
    ...common.createVariableExpectedData(scopeName, {
      ruleName: RuleName.BuiltInVariable,
      variables: placeholder?.builtinVaribles ?? constants_v2.builtinVaribles,
    }),
    ...common.createVariableExpectedData(scopeName, {
      ruleName: RuleName.Variable,
      variables: [
        'var',
        '_var123',
        'v'.repeat(253),
      ],
    }),
    ...common.createVariableExpectedData(scopeName, {
      ruleName: RuleName.ClassName,
      variables: placeholder?.builtInClassNames ?? constants_v2.builtInClassNames,
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

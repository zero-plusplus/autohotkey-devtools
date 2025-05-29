import { dedent } from '@zero-plusplus/utilities/src';
import * as constants_v2 from '../../../../src/autohotkey2/constants';
import { RuleName, StyleName } from '../../../../src/constants';
import { name } from '../../../../src/tmlanguage';
import type { ScopeName } from '../../../../src/types';
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

    // Built-in class highlighting does not apply to field and object key
    [
      dedent`
        (float)
        (xxx.float)
        (xxx.FLOAT)
        ({
          float: 123,
          FLOAT: 123,
        })
      `,
      [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'float', scopes: name(scopeName, RuleName.ClassName) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'xxx', scopes: name(scopeName, RuleName.Variable) },
        { text: '.', scopes: name(scopeName, RuleName.Dot) },
        { text: 'float', scopes: name(scopeName, RuleName.Variable) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'xxx', scopes: name(scopeName, RuleName.Variable) },
        { text: '.', scopes: name(scopeName, RuleName.Dot) },
        { text: 'FLOAT', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: 'float', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'FLOAT', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],

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

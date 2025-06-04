import { dedent } from '@zero-plusplus/utilities/src';
import * as constants_v2 from '../../../../src/autohotkey2/constants';
import {
  name, RuleName, StyleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
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
        (float)               ; comment
        (xxx.float)           ; comment
        (xxx.FLOAT)           ; comment
        ({                    ; comment
          float: 123,         ; comment
          FLOAT: 123,         ; comment
        })                    ; comment
      `,
      [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'float', scopes: name(scopeName, RuleName.ClassName) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'xxx', scopes: name(scopeName, RuleName.Variable) },
        { text: '.', scopes: name(scopeName, RuleName.Dot) },
        { text: 'float', scopes: name(scopeName, RuleName.Variable) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'xxx', scopes: name(scopeName, RuleName.Variable) },
        { text: '.', scopes: name(scopeName, RuleName.Dot) },
        { text: 'FLOAT', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'float', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'FLOAT', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // invalid
    [
      dedent`
        (${'v'.repeat(255)})            ; comment
      `,
      [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'v'.repeat(253), scopes: name(scopeName, RuleName.Variable) },
        { text: 'v'.repeat(2), scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

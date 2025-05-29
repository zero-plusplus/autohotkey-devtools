import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../../src/constants';
import { name } from '../../../../../src/tmlanguage';
import type { ScopeName } from '../../../../../src/types';
import type { ExpectedTestData } from '../../../../types';

export function createMetaFunctionDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...[ '__NEW', '__DELETE', '__GET', '__SET', '__CALL' ].flatMap((metaFunctionName): ExpectedTestData[] => {
      return [
        [
          dedent`
            class {
              ${metaFunctionName}(byref a, b := 123, c*) {
              }
            }
          `, [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },

            { text: metaFunctionName, scopes: name(scopeName, RuleName.MetaFunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: 'byref', scopes: name(scopeName, RuleName.KeywordInExpression) },
            { text: 'a', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'b', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'c', scopes: name(scopeName, RuleName.Variable) },
            { text: '*', scopes: name(scopeName, RuleName.Operator) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
          ],
        ],
      ];
    }),
  ];
}

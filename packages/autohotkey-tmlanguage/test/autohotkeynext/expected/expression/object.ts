import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import * as v2 from '../../../autohotkey2/expected/expression/object';
import type { ExpectedTestData } from '../../../types';

export function createObjectLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...v2.createObjectLiteralExpectedData(scopeName),

    [
      dedent`
        var := {
          key: () {
            if (true) {
            }
          }
        }
      `,
      [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: 'key', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: 'if', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
      ],
    ],
  ];
}

import { dedent } from '@zero-plusplus/utilities/src';
import { Repository, RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createIfStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        if true {
        }
      `,
      [
        { text: 'if', scopes: name(scopeName, Repository.IfStatement, RuleName.ControlFlowKeyword) },
        { text: 'true', scopes: name(scopeName, RuleName.BuiltInVariable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
    [
      dedent`
        if (true) {
        }
      `,
      [
        { text: 'if', scopes: name(scopeName, Repository.IfStatement, RuleName.ControlFlowKeyword) },
        { text: '(', scopes: name(scopeName, Repository.ParenthesizedExpression, RuleName.OpenParen) },
        { text: 'true', scopes: name(scopeName, Repository.ParenthesizedExpression, RuleName.BuiltInVariable) },
        { text: ')', scopes: name(scopeName, Repository.ParenthesizedExpression, RuleName.CloseParen) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
    [
      dedent`
        if (true)
        {
        }
      `,
      [
        { text: 'if', scopes: name(scopeName, Repository.IfStatement, RuleName.ControlFlowKeyword) },
        { text: '(', scopes: name(scopeName, Repository.ParenthesizedExpression, RuleName.OpenParen) },
        { text: 'true', scopes: name(scopeName, Repository.ParenthesizedExpression, RuleName.BuiltInVariable) },
        { text: ')', scopes: name(scopeName, Repository.ParenthesizedExpression, RuleName.CloseParen) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
  ];
}

import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createCallExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // Highlight object literal as block because of conflicts with function definition expression in v2.1
    [
      dedent`
        XXX(
          { key: value }
        )
      `,
      [
        { text: 'XXX', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: 'key', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Operator) },
        { text: 'value', scopes: name(scopeName, RuleName.Variable) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],
  ];
}

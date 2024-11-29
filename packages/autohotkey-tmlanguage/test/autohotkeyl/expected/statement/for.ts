import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createForStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        for key, value in obj {
        }
        for key, value in obj
        {
        }
      `,
      [
        { text: 'for', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'key', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'value', scopes: name(scopeName, RuleName.Variable) },
        { text: 'in', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'obj', scopes: name(scopeName, RuleName.Variable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'for', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'key', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'value', scopes: name(scopeName, RuleName.Variable) },
        { text: 'in', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'obj', scopes: name(scopeName, RuleName.Variable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
    [
      dedent`
        for, key, value in obj {
        }
        for, key, value in obj
        {
        }
      `,
      [
        { text: 'for', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'key', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'value', scopes: name(scopeName, RuleName.Variable) },
        { text: 'in', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'obj', scopes: name(scopeName, RuleName.Variable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'for', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'key', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'value', scopes: name(scopeName, RuleName.Variable) },
        { text: 'in', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'obj', scopes: name(scopeName, RuleName.Variable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
  ];
}

import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createSwitchStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        switch {
        }
        Switch
        {
        }
      `,
      [
        { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'Switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
    [
      dedent`
        switch (true) {
        }
        switch true {
        }
      `,
      [
        { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],


    [
      dedent`
        switch true {
          case true:
            break
          default: break
        }
        switch true {
          case true: {
            break
          }
          default:
          {
            break
          }
        }
      `,
      [
        { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
        { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
        { text: ':', scopes: name(scopeName, RuleName.SemiColon) },
        { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: 'default', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
        { text: ':', scopes: name(scopeName, RuleName.SemiColon) },
        { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
        { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
        { text: ':', scopes: name(scopeName, RuleName.SemiColon) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: 'default', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
        { text: ':', scopes: name(scopeName, RuleName.SemiColon) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
  ];
}

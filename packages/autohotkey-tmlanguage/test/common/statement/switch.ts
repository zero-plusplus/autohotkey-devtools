import { dedent, repeatArray } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../src/constants';
import type { ScopeName } from '../../../src/types';
import { name } from '../../../src/utils';
import type { ExpectedTestData } from '../../types';

export function createSwitchStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        switch {
        }
        switch
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),
      ],
    ],
    [
      dedent`
        switch true {
        }
        switch true
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),
      ],
    ],
    [
      dedent`
        switch (true) {
        }
        switch (true)
        {
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),
      ],
    ],
    [
      dedent`
        switch true {
          case true: break
          default: break
        }
        switch true {
          case true:
            break
          default:
            break
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
          { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
          { text: ':', scopes: name(scopeName, RuleName.Colon) },
          { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
          { text: 'default', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
          { text: ':', scopes: name(scopeName, RuleName.Colon) },
          { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),
      ],
    ],
    [
      dedent`
        switch true {
          case true: {
            break
          }
          default: {
            break
          }
        }

        switch true
        {
          case true:
          {
            break
          }
          default:
          {
            break
          }
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
          { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
          { text: ':', scopes: name(scopeName, RuleName.Colon) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: 'default', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
          { text: ':', scopes: name(scopeName, RuleName.Colon) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),
      ],
    ],
    [
      dedent`
        switch true {
          case true, false: break
          default: break
        }
      `,
      [
        { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
        { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'false', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: 'default', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'break', scopes: name(scopeName, RuleName.JumpCommandName) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],

    // Incomplete switch labels
    [
      dedent`
        switch (true) {
          case
          case:
          default
          default:
        }
        switch (true)
        {
          case
          case:
          default
          default:
        }
      `,
      [
        ...repeatArray(2, [
          { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
          { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
          { text: ':', scopes: name(scopeName, RuleName.Colon) },
          { text: 'default', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
          { text: 'default', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
          { text: ':', scopes: name(scopeName, RuleName.Colon) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        ]),
      ],
    ],
  ];
}

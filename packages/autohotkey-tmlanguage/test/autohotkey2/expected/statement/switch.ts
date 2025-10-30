import { dedent } from '@zero-plusplus/utilities/src';
import {
  name,
  RuleDescriptor,
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createSwitchStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createSwitchStatementExpectedData(scopeName),

    ...((): ExpectedTestData[] => {
      return [
        // one true brace style
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                switch true, "On" {       ; comment
                }                         ; comment
              `,
              [
                { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
                { text: 'On', scopes: name(scopeName, RuleName.DoubleString) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                switch (true), "On" {       ; comment
                }                           ; comment
              `,
              [
                { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
                { text: 'On', scopes: name(scopeName, RuleName.DoubleString) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
          ];
        })(),

        // K&R style
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                switch true, "On"     ; comment
                {                     ; comment
                }                     ; comment
              `,
              [
                { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
                { text: 'On', scopes: name(scopeName, RuleName.DoubleString) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                switch (true), "On"       ; comment
                {                         ; comment
                }                         ; comment
              `,
              [
                { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
                { text: 'On', scopes: name(scopeName, RuleName.DoubleString) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
          ];
        })(),
      ];
    })(),

    // Treat after the case statement as the start of a statement
    [
      dedent`
        switch {                ; comment
          case true: MsgBox     ; comment
        }                       ; comment
      `,
      [
        { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'case', scopes: name(scopeName, RuleName.SwitchLabelKeyword) },
        { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'MsgBox', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

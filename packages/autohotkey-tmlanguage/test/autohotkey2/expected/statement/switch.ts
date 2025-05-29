import { dedent, repeatArray } from '@zero-plusplus/utilities/src';
import {
  name, RuleDescriptor, RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createSwitchStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createSwitchStatementExpectedData(scopeName),

    [
      dedent`
        switch true, "On" {
        }
        switch true, "On"
        {
        }
        switch true, "Off" {
        }
        switch true, "Off"
        {
        }
        switch true, "Locale" {
        }
        switch true, "Locale"
        {
        }
      `,
      [
        ...[ 'On', 'Off', 'Locale' ].flatMap((arg) => {
          return repeatArray(2, [
            { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
            { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
            { text: arg, scopes: name(scopeName, RuleName.DoubleString) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          ]);
        }),
      ],
    ],
    [
      dedent`
        switch (true), "On" {
        }
        switch (true), "On"
        {
        }
        switch (true), "Off" {
        }
        switch (true), "Off"
        {
        }
        switch (true), "Locale" {
        }
        switch (true), "Locale"
        {
        }
      `,
      [
        ...[ 'On', 'Off', 'Locale' ].flatMap((arg) => {
          return repeatArray(2, [
            { text: 'switch', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
            { text: arg, scopes: name(scopeName, RuleName.DoubleString) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          ]);
        }),
      ],
    ],
  ];
}

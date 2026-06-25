import { dedent } from '@zero-plusplus/utilities/src/index.ts';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../types.ts';

export function createThrowStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        throw             ; comment
        throw,            ; comment
        throw err         ; comment
        throw, err        ; comment
      `,
      [
        { text: 'throw', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'throw', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'throw', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'err', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'throw', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'err', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createAutoHotkey2ExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // #region expression/call
    [
      dedent`
        XXX(
          { key: value }
        )
      `,
      [
        { text: 'XXX', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: 'key', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'value', scopes: name(scopeName, RuleName.Variable) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],
    // #endregion expression/call
  ];
}

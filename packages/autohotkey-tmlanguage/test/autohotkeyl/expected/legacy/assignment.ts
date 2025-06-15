import { dedent } from '@zero-plusplus/utilities/src';
import * as constants_v1 from '../../../../src/autohotkeyl/constants';
import {
  name, RuleName, StyleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createLegacyAssignmentStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        var = text      ; comment
      `,
      [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '=', scopes: name(scopeName, RuleName.Operator) },
        { text: 'text', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        var = ${constants_v1.unquoteEscapeSequences.join('')}     ; comment
      `,
      [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '=', scopes: name(scopeName, RuleName.Operator) },
        ...constants_v1.unquoteEscapeSequences.map((escapeSequence) => {
          return { text: escapeSequence, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) };
        }),
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        var = a \`;     ; comment
      `,
      [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '=', scopes: name(scopeName, RuleName.Operator) },
        { text: 'a ', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '`;', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        var = %var2%      ; comment
      `,
      [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '=', scopes: name(scopeName, RuleName.Operator) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'var2', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        var = % abc       ; comment
      `,
      [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '=', scopes: name(scopeName, RuleName.Operator) },
        { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        var = % (foo,bar)       ; comment
      `,
      [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '=', scopes: name(scopeName, RuleName.Operator) },
        { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'foo', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'bar', scopes: name(scopeName, RuleName.Variable) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

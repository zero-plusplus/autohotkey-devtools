import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createNewExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        new abc()               ; comment
        new %abc%()             ; comment
        new %abc%edf()          ; comment
      `,
      [
        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'abc', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: '%abc%', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: '%abc%edf', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
    [
      dedent`
        new a.b.c()               ; comment
        new %a%.b[c].d()          ; comment
      `,
      [
        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: '.', scopes: name(scopeName, RuleName.Dot) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: '.', scopes: name(scopeName, RuleName.Dot) },
        { text: 'c', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '.', scopes: name(scopeName, RuleName.Dot) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
        { text: 'c', scopes: name(scopeName, RuleName.Variable) },
        { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
        { text: '.', scopes: name(scopeName, RuleName.Dot) },
        { text: 'd', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
    [
      dedent`
        new abc(              ; comment
          1,                  ; comment
          2                   ; comment
          , new abc(          ; comment
            3,                ; comment
            4,                ; comment
          )                   ; comment
        )                     ; comment
      `,
      [
        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'abc', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '1', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '2', scopes: name(scopeName, RuleName.Integer) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'abc', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '3', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '4', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // Note: The following variable names should be errors, but were daringly allowed because they slow down the processing speed to the extent that it freezes when analyzing exactly
    [
      dedent`
        new %abc()              ; comment
        new %abc%abc%()         ; comment
      `,
      [
        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: '%abc', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: '%abc%abc%', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // comment
    [
      dedent`
        new abc(a, b, c)        ; comment
        new abc(                ; comment
                                ; comment
          a,                    ; comment
          b,                    ; comment
          c,                    ; comment
        )                       ; comment
        new abc(                ; comment
                                ; comment
          , a                   ; comment
          , b                   ; comment
          , c                   ; comment
        )                       ; comment
      `,
      [
        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'abc', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'c', scopes: name(scopeName, RuleName.Variable) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'abc', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '; comment', scopes: name(scopeName, RuleName.SingleLineComment) },

        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
        { text: 'c', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'abc', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '; comment', scopes: name(scopeName, RuleName.SingleLineComment) },

        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'c', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

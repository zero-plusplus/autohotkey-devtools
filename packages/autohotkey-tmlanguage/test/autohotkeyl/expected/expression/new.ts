import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import { name } from '../../../../src/tmlanguage';
import type { ScopeName } from '../../../../src/types';
import type { ExpectedTestData } from '../../../types';

export function createNewExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        new abc()
        new %abc%()
        new %abc%edf()
      `, [
        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'abc', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: '%abc%', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: '%abc%edf', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],
    [
      dedent`
        new a.b.c()
        new %a%.b[c].d()
      `, [
        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: '.', scopes: name(scopeName, RuleName.Dot) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: '.', scopes: name(scopeName, RuleName.Dot) },
        { text: 'c', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

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
      ],
    ],
    [
      dedent`
        new abc(
          1,
          2,
          new abc(
            3,
            4,
          )
        )
      `, [
        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'abc', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '2', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'abc', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '3', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '4', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],

    // Note: The following variable names should be errors, but were daringly allowed because they slow down the processing speed to the extent that it freezes when analyzing exactly
    [
      dedent`
        new %abc()
        new %abc%abc%()
      `, [
        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: '%abc', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: 'new', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: '%abc%abc%', scopes: name(scopeName, RuleName.ClassName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],

    // comment
    [
      dedent`
        new abc(a, b, c) ; comment
        new abc(
          ; comment
          a, ; comment
          b, ; comment
          c, ; comment
        ) ; comment
        new abc(
          ; comment
          , a ; comment
          , b ; comment
          , c ; comment
        ) ; comment
      `, [
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

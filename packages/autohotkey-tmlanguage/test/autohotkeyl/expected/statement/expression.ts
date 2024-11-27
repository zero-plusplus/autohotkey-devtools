import { dedent } from '@zero-plusplus/utilities/src';
import * as constants_v1 from '../../../../src/autohotkeyl/constants';
import { RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData, ParsedResult } from '../../../types';

export function createExpressionStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // #region variable
    [ 'var', [ { text: 'var', scopes: name(scopeName, RuleName.Variable) } ] ],
    [ '$#@_var123', [ { text: '$#@_var123', scopes: name(scopeName, RuleName.Variable) } ] ],
    [
      'v'.repeat(255), [
        { text: 'v'.repeat(253), scopes: name(scopeName, RuleName.Variable) },
        { text: 'v'.repeat(2), scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
      ],
    ],
    [
      '12abc', [
        { text: '12', scopes: name(scopeName, RuleName.Variable, RuleName.Integer, StyleName.Invalid) },
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
      ],
    ],
    // #endregion variable

    // #region builtin-variable
    ...constants_v1.builtinVaribles.map((builtinVariable): ExpectedTestData => {
      return [ builtinVariable, [ { text: builtinVariable, scopes: name(scopeName, RuleName.BuiltInVariable) } ] ];
    }),
    // #endregion builtin-variable

    // #region dereference
    [
      '%abc%', [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
    ],
    [
      '%A_ScriptDir%',
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'A_ScriptDir', scopes: name(scopeName, RuleName.BuiltInVariable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
    ],
    [
      '%%', [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin, StyleName.Invalid) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd, StyleName.Invalid) },
      ],
    ],
    [
      '%a', [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
      ],
    ],
    [
      '%a %', [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
    ],
    [
      '%a b c %', [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: 'c', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
    ],
    // #endregion dereference

    // #region string
    [
      '"string"', [
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringBegin) },
        { text: 'string', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringEnd) },
      ],
    ],
    // escape sequences
    [
      `"${constants_v1.doubleQuoteEscapeSequences.join('')}"`, [
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringBegin) },
        ...constants_v1.doubleQuoteEscapeSequences.map((escapeSequence): ParsedResult => {
          return { text: escapeSequence, scopes: name(scopeName, RuleName.DoubleString, StyleName.Escape) };
        }),
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringEnd) },
      ],
    ],
    [
      '"ab\r\nc\n"', [
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringBegin) },
        { text: 'a', scopes: name(scopeName, RuleName.DoubleString) },
        { text: 'b', scopes: name(scopeName, RuleName.DoubleString, StyleName.Invalid) },
        { text: 'c', scopes: name(scopeName, RuleName.DoubleString, StyleName.Invalid) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringEnd) },
      ],
    ],
    // #endregion string

    // #region number
    // integer
    [ '123', [ { text: '123', scopes: name(scopeName, RuleName.Integer) } ] ],
    [ '00123', [ { text: '00123', scopes: name(scopeName, RuleName.Integer) } ] ],

    // float
    [
      '123.0123', [
        { text: '123', scopes: name(scopeName, RuleName.Float, RuleName.Integer) },
        { text: '.', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPoint) },
        { text: '0123', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPart) },
      ],
    ],
    [
      '00123.0123', [
        { text: '00123', scopes: name(scopeName, RuleName.Float, RuleName.Integer) },
        { text: '.', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPoint) },
        { text: '0123', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPart) },
      ],
    ],
    [
      '123.0123', [
        { text: '123', scopes: name(scopeName, RuleName.Float, RuleName.Integer) },
        { text: '.', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPoint) },
        { text: '0123', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPart) },
      ],
    ],
    [
      '00123.0123', [
        { text: '00123', scopes: name(scopeName, RuleName.Float, RuleName.Integer) },
        { text: '.', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPoint) },
        { text: '0123', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPart) },
      ],
    ],
    [
      '123.', [
        { text: '123', scopes: name(scopeName, RuleName.Float, RuleName.Integer) },
        { text: '.', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPoint, StyleName.Invalid) },
      ],
    ],

    // hex
    [
      '0x123ABC', [
        { text: '0x', scopes: name(scopeName, RuleName.Hex, RuleName.HexPrefix) },
        { text: '123ABC', scopes: name(scopeName, RuleName.Hex, RuleName.HexValue) },
      ],
    ],
    [
      '12300x123ABC', [
        { text: '1230', scopes: name(scopeName, RuleName.HexPrefix, StyleName.Invalid) },
        { text: '0x', scopes: name(scopeName, RuleName.Hex, RuleName.HexPrefix) },
        { text: '123ABC', scopes: name(scopeName, RuleName.Hex, RuleName.HexValue) },
      ],
    ],
    [
      '0x', [
        { text: '0', scopes: name(scopeName, RuleName.Hex, RuleName.HexPrefix) },
        { text: 'x', scopes: name(scopeName, RuleName.Hex, RuleName.HexPrefix, StyleName.Invalid) },
      ],
    ],
    [
      '0x123ABC.', [
        { text: '0x', scopes: name(scopeName, RuleName.Hex, RuleName.HexPrefix) },
        { text: '123ABC', scopes: name(scopeName, RuleName.Hex, RuleName.HexValue) },
        { text: '.', scopes: name(scopeName, RuleName.DecimalPoint, StyleName.Invalid) },
      ],
    ],

    // scientific notation
    [
      '123.0e1', [
        { text: '123', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.Integer) },
        { text: '.', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint) },
        { text: '0', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart) },
        { text: 'e', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ENotation) },
        { text: '1', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Exponent) },
      ],
    ],
    [
      '123.0e+1', [
        { text: '123', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.Integer) },
        { text: '.', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint) },
        { text: '0', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart) },
        { text: 'e', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ENotation) },
        { text: '+', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign) },
        { text: '1', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Exponent) },
      ],
    ],
    [
      '123.0E-1', [
        { text: '123', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.Integer) },
        { text: '.', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint) },
        { text: '0', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart) },
        { text: 'E', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ENotation) },
        { text: '-', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign) },
        { text: '1', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Exponent) },
      ],
    ],
    [
      '123e', [
        { text: '123', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Integer) },
        { text: 'e', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ENotation, StyleName.Invalid) },
      ],
    ],
    [
      '123e+', [
        { text: '123', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Integer) },
        { text: 'e', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ENotation) },
        { text: '+', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign, StyleName.Invalid) },
      ],
    ],
    [
      '123e+1.', [
        { text: '123', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Integer) },
        { text: 'e', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ENotation) },
        { text: '+', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign) },
        { text: '1', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Exponent) },
        { text: '.', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.DecimalPart, StyleName.Invalid) },
      ],
    ],
    // #endregion number

    // #region object
    [
      'abc := { key: 1, key2: { %key3%: 2 } }', [
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: 'key', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'key2', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'key3', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '2', scopes: name(scopeName, RuleName.Integer) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
      ],
    ],
    // #endregion object

    // #region array
    [
      dedent`abc := [ 1, [ 2 ], 3 ]`, [
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
        { text: '2', scopes: name(scopeName, RuleName.Integer) },
        { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '3', scopes: name(scopeName, RuleName.Integer) },
        { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
      ],
    ],
    [
      dedent`abc := [ 1
                    , [ 2 ]
                    , 3 ]`, [
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
        { text: '2', scopes: name(scopeName, RuleName.Integer) },
        { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '3', scopes: name(scopeName, RuleName.Integer) },
        { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
      ],
    ],
    // #endregion array

    // #region call
    [
      dedent`
        abc()
        %abc%()
        %abc%edf()
      `, [
        { text: 'abc', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '%abc%', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '%abc%edf', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],
    [
      dedent`
        abc(a, b, c)
        abc(
          a, ; comment
          b, ; comment
          c, ; comment
        )
        abc(
          , a ; comment
          , b ; comment
          , c ; comment
        )
      `, [
        { text: 'abc', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'c', scopes: name(scopeName, RuleName.Variable) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: 'abc', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
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

        { text: 'abc', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
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
      ],
    ],
    // #endregion call

    // #region parenthesized expression
    [
      '(var)', [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],
    // #endregion parenthesized expression
  ];
}

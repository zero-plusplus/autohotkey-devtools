import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName, StyleName } from '../../../src/constants';
import type { ScopeName } from '../../../src/types';
import { name } from '../../../src/utils';
import type { ExpectedTestData } from '../../types';

export function createNumberLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // #region integer
    [
      dedent`
        (123)
        (00123)
      `,
      [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '00123', scopes: name(scopeName, RuleName.Integer) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],
    // #endregion integer

    // #region float
    [
      dedent`
        (123.0123)
        (00123.0123)
        (123.)
      `,
      [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '123', scopes: name(scopeName, RuleName.Float, RuleName.Integer) },
        { text: '.', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPoint) },
        { text: '0123', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPart) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '00123', scopes: name(scopeName, RuleName.Float, RuleName.Integer) },
        { text: '.', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPoint) },
        { text: '0123', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPart) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '123', scopes: name(scopeName, RuleName.Float, RuleName.Integer) },
        { text: '.', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPoint, StyleName.Invalid) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],
    // #endregion float

    // #region hex
    [
      dedent`
        (0x123ABC)
        (12300x123ABC)
        (0x)
        (0x123ABC.)
      `,
      [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '0x', scopes: name(scopeName, RuleName.Hex, RuleName.HexPrefix) },
        { text: '123ABC', scopes: name(scopeName, RuleName.Hex, RuleName.HexValue) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '1230', scopes: name(scopeName, RuleName.HexPrefix, StyleName.Invalid) },
        { text: '0x', scopes: name(scopeName, RuleName.Hex, RuleName.HexPrefix) },
        { text: '123ABC', scopes: name(scopeName, RuleName.Hex, RuleName.HexValue) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '0', scopes: name(scopeName, RuleName.Hex, RuleName.HexPrefix) },
        { text: 'x', scopes: name(scopeName, RuleName.Hex, RuleName.HexPrefix, StyleName.Invalid) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '0x', scopes: name(scopeName, RuleName.Hex, RuleName.HexPrefix) },
        { text: '123ABC', scopes: name(scopeName, RuleName.Hex, RuleName.HexValue) },
        { text: '.', scopes: name(scopeName, RuleName.DecimalPoint, StyleName.Invalid) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],
    // #endregion hex

    // #region scientific notation
    [
      dedent`
        (123.0e1)
        (123.0e+1)
        (123.0E-1)
        (123e)
        (123e+)
        (123e+1.)
      `, [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '123', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.Integer) },
        { text: '.', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint) },
        { text: '0', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart) },
        { text: 'e', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ENotation) },
        { text: '1', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Exponent) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '123', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.Integer) },
        { text: '.', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint) },
        { text: '0', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart) },
        { text: 'e', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ENotation) },
        { text: '+', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign) },
        { text: '1', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Exponent) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '123', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.Integer) },
        { text: '.', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint) },
        { text: '0', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart) },
        { text: 'E', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ENotation) },
        { text: '-', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign) },
        { text: '1', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Exponent) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '123', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Integer) },
        { text: 'e', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ENotation, StyleName.Invalid) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '123', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Integer) },
        { text: 'e', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ENotation) },
        { text: '+', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign, StyleName.Invalid) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '123', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Integer) },
        { text: 'e', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ENotation) },
        { text: '+', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign) },
        { text: '1', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.Exponent) },
        { text: '.', scopes: name(scopeName, RuleName.ScientificNotation, RuleName.DecimalPart, StyleName.Invalid) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],
    // #endregion scientific notation
  ];
}

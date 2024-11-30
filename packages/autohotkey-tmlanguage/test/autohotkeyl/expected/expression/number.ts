import { RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createNumberLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // #region integer
    [ '123', [ { text: '123', scopes: name(scopeName, RuleName.Integer) } ] ],
    [ '00123', [ { text: '00123', scopes: name(scopeName, RuleName.Integer) } ] ],
    // #endregion integer

    // #region float
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
    // #endregion float

    // #region hex
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
    // #endregion hex

    // #region scientific notation
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
    // #endregion scientific notation
  ];
}

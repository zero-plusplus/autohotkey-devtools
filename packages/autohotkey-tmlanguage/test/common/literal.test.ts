import { RuleName, ScopeName } from '../../src/types';
import { createUtilities } from '../../src/utils';
import { parse } from '../helpers/textmate-parser';

describe.each([
  [ 'autohotkeynext' ],
  [ 'autohotkey2' ],
  [ 'autohotkeyl' ],
] as ScopeName[][])('literal', (scopeName) => {
  const { name } = createUtilities(scopeName);

  describe(`[${scopeName}] integer`, () => {
    test.each([
      [ '123', [ { text: '123', scopes: [ name(RuleName.Integer) ] } ] ],
      [ '00123', [ { text: '00123', scopes: [ name(RuleName.Integer) ] } ] ],
    ])(
      'valid',
      async(text, expected) => {
        const actual = await parse(scopeName, text);
        // console.log(JSON.stringify(actual, undefined, 2));

        expect(actual).toStrictEqual(expected);
      },
    );
  });

  describe(`[${scopeName}] float`, () => {
    test.each([
      [
        '123.0123', [
          { text: '123', scopes: [ name(RuleName.Float), name(RuleName.Integer) ] },
          { text: '.', scopes: [ name(RuleName.Float), name(RuleName.DecimalPoint) ] },
          { text: '0123', scopes: [ name(RuleName.Float), name(RuleName.DecimalPart) ] },
        ],
      ],
      [
        '00123.0123', [
          { text: '00123', scopes: [ name(RuleName.Float), name(RuleName.Integer) ] },
          { text: '.', scopes: [ name(RuleName.Float), name(RuleName.DecimalPoint) ] },
          { text: '0123', scopes: [ name(RuleName.Float), name(RuleName.DecimalPart) ] },
        ],
      ],
    ])(
      'valid',
      async(text, expected) => {
        const actual = await parse(scopeName, text);
        // console.log(JSON.stringify(actual, undefined, 2));

        expect(actual).toStrictEqual(expected);
      },
    );

    test.each([
      [
        '123.', [
          { text: '123', scopes: [ name(RuleName.Float), name(RuleName.Integer) ] },
          { text: '.', scopes: [ name(RuleName.Float), name(RuleName.DecimalPoint), name(RuleName.InvalidNumber) ] },
        ],
      ],
    ])(
      'invalid',
      async(text, expected) => {
        const actual = await parse(scopeName, text);
        // console.log(JSON.stringify(actual, undefined, 2));

        expect(actual).toStrictEqual(expected);
      },
    );
  });

  describe(`[${scopeName}] hex`, () => {
    test.each([
      [
        '0x123ABC', [
          { text: '0x', scopes: [ name(RuleName.Hex), name(RuleName.HexPrefix) ] },
          { text: '123ABC', scopes: [ name(RuleName.Hex), name(RuleName.HexValue) ] },
        ],
      ],
    ])(
      'valid',
      async(text, expected) => {
        const actual = await parse(scopeName, text);
        // console.log(JSON.stringify(actual, undefined, 2));

        expect(actual).toStrictEqual(expected);
      },
    );

    test.each([
      [
        '12300x123ABC', [
          { text: '1230', scopes: [ name(RuleName.HexPrefix), name(RuleName.InvalidNumber) ] },
          { text: '0x', scopes: [ name(RuleName.Hex), name(RuleName.HexPrefix) ] },
          { text: '123ABC', scopes: [ name(RuleName.Hex), name(RuleName.HexValue) ] },
        ],
      ],
      [
        '0x', [
          { text: '0', scopes: [ name(RuleName.Hex), name(RuleName.HexPrefix) ] },
          { text: 'x', scopes: [ name(RuleName.Hex), name(RuleName.HexPrefix), name(RuleName.InvalidNumber) ] },
        ],
      ],
      [
        '0x123ABC.', [
          { text: '0x', scopes: [ name(RuleName.Hex), name(RuleName.HexPrefix) ] },
          { text: '123ABC', scopes: [ name(RuleName.Hex), name(RuleName.HexValue) ] },
          { text: '.', scopes: [ name(RuleName.DecimalPoint), name(RuleName.InvalidNumber) ] },
        ],
      ],
    ])(
      'invalid',
      async(text, expected) => {
        const actual = await parse(scopeName, text);
        // console.log(JSON.stringify(actual, undefined, 2));

        expect(actual).toStrictEqual(expected);
      },
    );
  });

  describe(`[${scopeName}] scientific notation`, () => {
    test.each([
      [
        '123.0e1', [
          { text: '123', scopes: [ name(RuleName.ScientificNotation), name(RuleName.Float), name(RuleName.Integer) ] },
          { text: '.', scopes: [ name(RuleName.ScientificNotation), name(RuleName.Float), name(RuleName.DecimalPoint) ] },
          { text: '0', scopes: [ name(RuleName.ScientificNotation), name(RuleName.Float), name(RuleName.DecimalPart) ] },
          { text: 'e', scopes: [ name(RuleName.ScientificNotation), name(RuleName.ENotation) ] },
          { text: '1', scopes: [ name(RuleName.ScientificNotation), name(RuleName.Exponent) ] },
        ],
      ],
      [
        '123.0e+1', [
          { text: '123', scopes: [ name(RuleName.ScientificNotation), name(RuleName.Float), name(RuleName.Integer) ] },
          { text: '.', scopes: [ name(RuleName.ScientificNotation), name(RuleName.Float), name(RuleName.DecimalPoint) ] },
          { text: '0', scopes: [ name(RuleName.ScientificNotation), name(RuleName.Float), name(RuleName.DecimalPart) ] },
          { text: 'e', scopes: [ name(RuleName.ScientificNotation), name(RuleName.ENotation) ] },
          { text: '+', scopes: [ name(RuleName.ScientificNotation), name(RuleName.ExponentPlusMinusSign) ] },
          { text: '1', scopes: [ name(RuleName.ScientificNotation), name(RuleName.Exponent) ] },
        ],
      ],
      [
        '123.0E-1', [
          { text: '123', scopes: [ name(RuleName.ScientificNotation), name(RuleName.Float), name(RuleName.Integer) ] },
          { text: '.', scopes: [ name(RuleName.ScientificNotation), name(RuleName.Float), name(RuleName.DecimalPoint) ] },
          { text: '0', scopes: [ name(RuleName.ScientificNotation), name(RuleName.Float), name(RuleName.DecimalPart) ] },
          { text: 'E', scopes: [ name(RuleName.ScientificNotation), name(RuleName.ENotation) ] },
          { text: '-', scopes: [ name(RuleName.ScientificNotation), name(RuleName.ExponentPlusMinusSign) ] },
          { text: '1', scopes: [ name(RuleName.ScientificNotation), name(RuleName.Exponent) ] },
        ],
      ],
    ])(
      'valid',
      async(text, expected) => {
        const actual = await parse(scopeName, text);
        // console.log(JSON.stringify(actual, undefined, 2));

        expect(actual).toStrictEqual(expected);
      },
    );

    test.each([
      [
        '123e', [
          { text: '123', scopes: [ name(RuleName.ScientificNotation), name(RuleName.Integer) ] },
          { text: 'e', scopes: [ name(RuleName.ScientificNotation), name(RuleName.ENotation), name(RuleName.InvalidNumber) ] },
        ],
      ],
      [
        '123e+', [
          { text: '123', scopes: [ name(RuleName.ScientificNotation), name(RuleName.Integer) ] },
          { text: 'e', scopes: [ name(RuleName.ScientificNotation), name(RuleName.ENotation) ] },
          { text: '+', scopes: [ name(RuleName.ScientificNotation), name(RuleName.ExponentPlusMinusSign), name(RuleName.InvalidNumber) ] },
        ],
      ],
      [
        '123e+1.', [
          { text: '123', scopes: [ name(RuleName.ScientificNotation), name(RuleName.Integer) ] },
          { text: 'e', scopes: [ name(RuleName.ScientificNotation), name(RuleName.ENotation) ] },
          { text: '+', scopes: [ name(RuleName.ScientificNotation), name(RuleName.ExponentPlusMinusSign) ] },
          { text: '1', scopes: [ name(RuleName.ScientificNotation), name(RuleName.Exponent) ] },
          { text: '.', scopes: [ name(RuleName.ScientificNotation), name(RuleName.DecimalPart), name(RuleName.InvalidNumber) ] },
        ],
      ],
    ])(
      'invalid',
      async(text, expected) => {
        const actual = await parse(scopeName, text);
        // console.log(JSON.stringify(actual, undefined, 2));

        expect(actual).toStrictEqual(expected);
      },
    );
  });
});

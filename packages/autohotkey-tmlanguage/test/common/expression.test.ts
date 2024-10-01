import { RuleName, ScopeName } from '../../src/types';
import { createUtilities } from '../../src/utils';
import { parse } from '../helpers/textmate-parser';

describe.each([
  [ 'autohotkeynext' ],
  [ 'autohotkey2' ],
  [ 'autohotkeyl' ],
] as ScopeName[][])('expression', (scopeName) => {
  const { getBuiltInVariableNames, getEscapeSequencesInfo, name } = createUtilities(scopeName);
  const builtinVariables = getBuiltInVariableNames();
  const escapeSequencesInfo = getEscapeSequencesInfo();

  describe(`[${scopeName}] variable`, () => {
    describe(`[${scopeName}] variable`, () => {
      test.each([
        [ 'var', [ { text: 'var', scopes: name(RuleName.Variable) } ] ],
        [ 'var_123', [ { text: 'var_123', scopes: name(RuleName.Variable) } ] ],
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
          'v'.repeat(255), [
            { text: 'v'.repeat(253), scopes: name(RuleName.Variable) },
            { text: 'v'.repeat(2), scopes: name(RuleName.Variable, RuleName.InvalidVariable) },
          ],
        ],
        [
          '12abc', [
            { text: '12', scopes: name(RuleName.Variable, RuleName.Integer, RuleName.InvalidVariable) },
            { text: 'abc', scopes: name(RuleName.Variable) },
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

      test.each(builtinVariables.map((builtinVariable) => {
        return [ builtinVariable, [ { text: builtinVariable, scopes: name(RuleName.BuiltInVariable) } ] ];
      }))('built-in variable', async(text, expected) => {
        const actual = await parse(scopeName, text);
        // console.log(JSON.stringify(actual, undefined, 2));

        expect(actual).toStrictEqual(expected);
      });
    });
  });

  // #region literal
  describe(`[${scopeName}] string`, () => {
    describe(`[${scopeName}] double quote string`, () => {
      test(
        'plain text',
        async() => {
          const actual = await parse(scopeName, '"string"');
          // console.log(JSON.stringify(actual, undefined, 2));

          expect(actual).toStrictEqual([
            { text: '"', scopes: name(RuleName.DoubleString, RuleName.StringBegin) },
            { text: 'string', scopes: name(RuleName.DoubleString) },
            { text: '"', scopes: name(RuleName.DoubleString, RuleName.StringEnd) },
          ]);
        },
      );

      test(
        'escape sequences',
        async() => {
          const actual = await parse(scopeName, `"${escapeSequencesInfo.doubleQuote.join('')}"`);
          // console.log(JSON.stringify(actual, undefined, 2));

          expect(actual).toStrictEqual([
            { text: '"', scopes: name(RuleName.DoubleString, RuleName.StringBegin) },
            ...escapeSequencesInfo.doubleQuote.map((escapeSequence) => {
              return { text: escapeSequence, scopes: name(RuleName.DoubleString, RuleName.DoubleStringEscapeSequence) };
            }),
            { text: '"', scopes: name(RuleName.DoubleString, RuleName.StringEnd) },
          ]);
        },
      );

      test('illegal', async() => {
        const actual = await parse(scopeName, '"ab\r\nc\n"');
        // console.log(JSON.stringify(actual, undefined, 2));

        expect(actual).toStrictEqual([
          { text: '"', scopes: name(RuleName.DoubleString, RuleName.StringBegin) },
          { text: 'a', scopes: name(RuleName.DoubleString) },
          { text: 'b', scopes: name(RuleName.DoubleString, RuleName.InvalidSingleLineStringContent) },
          { text: '\r\n' },
          { text: 'c', scopes: name(RuleName.DoubleString, RuleName.InvalidSingleLineStringContent) },
          { text: '\n' },
          { text: '"', scopes: name(RuleName.DoubleString, RuleName.StringEnd) },
        ]);
      });
    });
  });

  describe(`[${scopeName}] number`, () => {
    describe(`[${scopeName}] integer`, () => {
      test.each([
        [ '123', [ { text: '123', scopes: name(RuleName.Integer) } ] ],
        [ '00123', [ { text: '00123', scopes: name(RuleName.Integer) } ] ],
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
            { text: '123', scopes: name(RuleName.Float, RuleName.Integer) },
            { text: '.', scopes: name(RuleName.Float, RuleName.DecimalPoint) },
            { text: '0123', scopes: name(RuleName.Float, RuleName.DecimalPart) },
          ],
        ],
        [
          '00123.0123', [
            { text: '00123', scopes: name(RuleName.Float, RuleName.Integer) },
            { text: '.', scopes: name(RuleName.Float, RuleName.DecimalPoint) },
            { text: '0123', scopes: name(RuleName.Float, RuleName.DecimalPart) },
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
            { text: '123', scopes: name(RuleName.Float, RuleName.Integer) },
            { text: '.', scopes: name(RuleName.Float, RuleName.DecimalPoint, RuleName.InvalidNumber) },
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
            { text: '0x', scopes: name(RuleName.Hex, RuleName.HexPrefix) },
            { text: '123ABC', scopes: name(RuleName.Hex, RuleName.HexValue) },
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
            { text: '1230', scopes: name(RuleName.HexPrefix, RuleName.InvalidNumber) },
            { text: '0x', scopes: name(RuleName.Hex, RuleName.HexPrefix) },
            { text: '123ABC', scopes: name(RuleName.Hex, RuleName.HexValue) },
          ],
        ],
        [
          '0x', [
            { text: '0', scopes: name(RuleName.Hex, RuleName.HexPrefix) },
            { text: 'x', scopes: name(RuleName.Hex, RuleName.HexPrefix, RuleName.InvalidNumber) },
          ],
        ],
        [
          '0x123ABC.', [
            { text: '0x', scopes: name(RuleName.Hex, RuleName.HexPrefix) },
            { text: '123ABC', scopes: name(RuleName.Hex, RuleName.HexValue) },
            { text: '.', scopes: name(RuleName.DecimalPoint, RuleName.InvalidNumber) },
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
            { text: '123', scopes: name(RuleName.ScientificNotation, RuleName.Float, RuleName.Integer) },
            { text: '.', scopes: name(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint) },
            { text: '0', scopes: name(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart) },
            { text: 'e', scopes: name(RuleName.ScientificNotation, RuleName.ENotation) },
            { text: '1', scopes: name(RuleName.ScientificNotation, RuleName.Exponent) },
          ],
        ],
        [
          '123.0e+1', [
            { text: '123', scopes: name(RuleName.ScientificNotation, RuleName.Float, RuleName.Integer) },
            { text: '.', scopes: name(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint) },
            { text: '0', scopes: name(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart) },
            { text: 'e', scopes: name(RuleName.ScientificNotation, RuleName.ENotation) },
            { text: '+', scopes: name(RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign) },
            { text: '1', scopes: name(RuleName.ScientificNotation, RuleName.Exponent) },
          ],
        ],
        [
          '123.0E-1', [
            { text: '123', scopes: name(RuleName.ScientificNotation, RuleName.Float, RuleName.Integer) },
            { text: '.', scopes: name(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint) },
            { text: '0', scopes: name(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart) },
            { text: 'E', scopes: name(RuleName.ScientificNotation, RuleName.ENotation) },
            { text: '-', scopes: name(RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign) },
            { text: '1', scopes: name(RuleName.ScientificNotation, RuleName.Exponent) },
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
            { text: '123', scopes: name(RuleName.ScientificNotation, RuleName.Integer) },
            { text: 'e', scopes: name(RuleName.ScientificNotation, RuleName.ENotation, RuleName.InvalidNumber) },
          ],
        ],
        [
          '123e+', [
            { text: '123', scopes: name(RuleName.ScientificNotation, RuleName.Integer) },
            { text: 'e', scopes: name(RuleName.ScientificNotation, RuleName.ENotation) },
            { text: '+', scopes: name(RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign, RuleName.InvalidNumber) },
          ],
        ],
        [
          '123e+1.', [
            { text: '123', scopes: name(RuleName.ScientificNotation, RuleName.Integer) },
            { text: 'e', scopes: name(RuleName.ScientificNotation, RuleName.ENotation) },
            { text: '+', scopes: name(RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign) },
            { text: '1', scopes: name(RuleName.ScientificNotation, RuleName.Exponent) },
            { text: '.', scopes: name(RuleName.ScientificNotation, RuleName.DecimalPart, RuleName.InvalidNumber) },
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
  // #endregion literal
});

import { doubleStringEscapeSequences } from '../../src/autohotkeyl/repository/expression';
import { RuleName, ScopeName } from '../../src/types';
import { createUtilities } from '../../src/utils';
import { parse } from '../helpers/textmate-parser';

describe('expression', () => {
  const scopeName: ScopeName = 'autohotkeyl';
  const { getBuiltInVariableNames, name } = createUtilities(scopeName);
  const builtinVariables = getBuiltInVariableNames();

  // #region variable
  describe(`[${scopeName}] variable`, () => {
    test.each([
      [ 'var', [ { text: 'var', scopes: name(RuleName.Variable) } ] ],
      [ '$#@_var123', [ { text: '$#@_var123', scopes: name(RuleName.Variable) } ] ],
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
  });

  describe(`[${scopeName}] built-in variable`, () => {
    test.each(builtinVariables.map((builtinVariable) => {
      return [ builtinVariable, [ { text: builtinVariable, scopes: name(RuleName.BuiltInVariable) } ] ];
    }))('built-in variable', async(text, expected) => {
      const actual = await parse(scopeName, text);
      // console.log(JSON.stringify(actual, undefined, 2));

      expect(actual).toStrictEqual(expected);
    });
  });
  // #endregion variable

  // #region literal
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
        const actual = await parse(scopeName, `"${doubleStringEscapeSequences.join('')}"`);
        // console.log(JSON.stringify(actual, undefined, 2));

        expect(actual).toStrictEqual([
          { text: '"', scopes: name(RuleName.DoubleString, RuleName.StringBegin) },
          ...doubleStringEscapeSequences.map((escapeSequence) => {
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
        { text: '\r\n', scopes: name(RuleName.DoubleString, RuleName.InvalidStringNewLine) },
        { text: 'c', scopes: name(RuleName.DoubleString, RuleName.InvalidSingleLineStringContent) },
        { text: '\n', scopes: name(RuleName.DoubleString, RuleName.InvalidStringNewLine) },
        { text: '"', scopes: name(RuleName.DoubleString, RuleName.StringEnd) },
      ]);
    });
  });
  // #endregion literal
});

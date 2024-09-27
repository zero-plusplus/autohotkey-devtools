import { RuleName, ScopeName } from '../../src/types';
import { createUtilities } from '../../src/utils';
import { parse } from '../helpers/textmate-parser';

describe('expression', () => {
  const scopeName: ScopeName = 'autohotkey2';
  const { getBuiltInVariableNames, name } = createUtilities(scopeName);
  const builtinVariables = getBuiltInVariableNames();

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
});

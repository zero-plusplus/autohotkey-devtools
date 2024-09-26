import { RuleName, ScopeName } from '../../src/types';
import { createUtilities } from '../../src/utils';
import { parse } from '../helpers/textmate-parser';

describe('expression', () => {
  const scopeName: ScopeName = 'autohotkeyl';
  const { name } = createUtilities(scopeName);

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

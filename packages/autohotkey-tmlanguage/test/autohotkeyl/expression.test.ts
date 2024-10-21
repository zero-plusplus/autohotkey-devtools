import { Repository, RuleName } from '../../src/constants';
import type { ScopeName } from '../../src/types';
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
  });

  describe(`[${scopeName}] access`, () => {
    describe(`[${scopeName}] dereference`, () => {
      test.each([
        [
          '%abc%', [
            { text: '%', scopes: name(Repository.Dereference, RuleName.PercentBegin) },
            { text: 'abc', scopes: name(Repository.Dereference, RuleName.Variable) },
            { text: '%', scopes: name(Repository.Dereference, RuleName.PercentEnd) },
          ],
        ],
        [
          '%A_ScriptDir%',
          [
            { text: '%', scopes: name(Repository.Dereference, RuleName.PercentBegin) },
            { text: 'A_ScriptDir', scopes: name(Repository.Dereference, RuleName.BuiltInVariable) },
            { text: '%', scopes: name(Repository.Dereference, RuleName.PercentEnd) },
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
          '%%', [
            { text: '%', scopes: name(Repository.Dereference, RuleName.PercentBegin, RuleName.Invalid) },
            { text: '%', scopes: name(Repository.Dereference, RuleName.PercentEnd, RuleName.Invalid) },
          ],
        ],
        [
          '%a', [
            { text: '%', scopes: name(Repository.Dereference, RuleName.PercentBegin) },
            { text: 'a', scopes: name(Repository.Dereference, RuleName.Variable, RuleName.Invalid) },
          ],
        ],
        [
          '%a %', [
            { text: '%', scopes: name(Repository.Dereference, RuleName.PercentBegin) },
            { text: 'a', scopes: name(Repository.Dereference, RuleName.Variable, RuleName.Invalid) },
            { text: ' ' },
            { text: '%', scopes: name(Repository.Dereference, RuleName.PercentEnd) },
          ],
        ],
        [
          '%a b c %', [
            { text: '%', scopes: name(Repository.Dereference, RuleName.PercentBegin) },
            { text: 'a', scopes: name(Repository.Dereference, RuleName.Variable, RuleName.Invalid) },
            { text: ' ' },
            { text: 'b', scopes: name(Repository.Dereference, RuleName.Variable, RuleName.Invalid) },
            { text: ' ' },
            { text: 'c', scopes: name(Repository.Dereference, RuleName.Variable, RuleName.Invalid) },
            { text: ' ' },
            { text: '%', scopes: name(Repository.Dereference, RuleName.PercentEnd) },
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
});

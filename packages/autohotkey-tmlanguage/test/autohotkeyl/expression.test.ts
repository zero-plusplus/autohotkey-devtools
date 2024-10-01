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
  });

  describe(`[${scopeName}] access`, () => {
    describe(`[${scopeName}] dereference`, () => {
      test.each([
        [
          '%abc%', [
            { text: '%', scopes: name(RuleName.Dereference, RuleName.DereferencePercentBegin) },
            { text: 'abc', scopes: name(RuleName.Dereference, RuleName.Variable) },
            { text: '%', scopes: name(RuleName.Dereference, RuleName.DereferencePercentEnd) },
          ],
        ],
        [
          '%A_ScriptDir%',
          [
            { text: '%', scopes: name(RuleName.Dereference, RuleName.DereferencePercentBegin) },
            { text: 'A_ScriptDir', scopes: name(RuleName.Dereference, RuleName.BuiltInVariable) },
            { text: '%', scopes: name(RuleName.Dereference, RuleName.DereferencePercentEnd) },
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
            { text: '%', scopes: name(RuleName.Dereference, RuleName.DereferencePercentBegin, RuleName.InvalidDereferencePercent) },
            { text: '%', scopes: name(RuleName.Dereference, RuleName.DereferencePercentEnd, RuleName.InvalidDereferencePercent) },
          ],
        ],
        [
          '%a', [
            { text: '%', scopes: name(RuleName.Dereference, RuleName.DereferencePercentBegin) },
            { text: 'a', scopes: name(RuleName.Dereference, RuleName.Variable, RuleName.InvalidDereference) },
          ],
        ],
        [
          '%a %', [
            { text: '%', scopes: name(RuleName.Dereference, RuleName.DereferencePercentBegin) },
            { text: 'a', scopes: name(RuleName.Dereference, RuleName.Variable, RuleName.InvalidDereference) },
            { text: ' ' },
            { text: '%', scopes: name(RuleName.Dereference, RuleName.DereferencePercentEnd) },
          ],
        ],
        [
          '%a b c %', [
            { text: '%', scopes: name(RuleName.Dereference, RuleName.DereferencePercentBegin) },
            { text: 'a', scopes: name(RuleName.Dereference, RuleName.Variable, RuleName.InvalidDereference) },
            { text: ' ' },
            { text: 'b', scopes: name(RuleName.Dereference, RuleName.Variable, RuleName.InvalidDereference) },
            { text: ' ' },
            { text: 'c', scopes: name(RuleName.Dereference, RuleName.Variable, RuleName.InvalidDereference) },
            { text: ' ' },
            { text: '%', scopes: name(RuleName.Dereference, RuleName.DereferencePercentEnd) },
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

import { Repository, RuleName, StyleName } from '../../src/constants';
import type { ScopeName } from '../../src/types';
import { createUtilities, getEscapeSequencesInfo } from '../../src/utils';
import { parse } from '../helpers/textmate-parser';

describe('expression', () => {
  const scopeName: ScopeName = 'autohotkey2';
  const { name } = createUtilities(scopeName);
  const escapeSequencesInfo = getEscapeSequencesInfo(scopeName);

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
        [
          '%"abc"%',
          [
            { text: '%', scopes: name(Repository.Dereference, RuleName.PercentBegin) },
            { text: '"', scopes: name(Repository.Dereference, RuleName.DoubleString, RuleName.StringBegin) },
            { text: 'abc', scopes: name(Repository.Dereference, RuleName.DoubleString) },
            { text: '"', scopes: name(Repository.Dereference, RuleName.DoubleString, RuleName.StringEnd) },
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
            { text: '%', scopes: name(Repository.Dereference, RuleName.PercentBegin, StyleName.Invalid) },
            { text: '%', scopes: name(Repository.Dereference, RuleName.PercentEnd, StyleName.Invalid) },
          ],
        ],
        [ '%', [ { text: '%', scopes: name(Repository.Dereference, RuleName.PercentBegin, StyleName.Invalid) } ] ],
        [
          '%a', [
            { text: '%', scopes: name(Repository.Dereference, RuleName.PercentBegin) },
            { text: 'a', scopes: name(Repository.Dereference, RuleName.Variable, StyleName.Invalid) },
          ],
        ],
        [
          '%abc', [
            { text: '%', scopes: name(Repository.Dereference, RuleName.PercentBegin) },
            { text: 'ab', scopes: name(Repository.Dereference, RuleName.Variable) },
            { text: 'c', scopes: name(Repository.Dereference, RuleName.Variable, StyleName.Invalid) },
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

  // #region literal
  describe(`[${scopeName}] string`, () => {
    describe(`[${scopeName}] single quote string`, () => {
      test(
        'plain text',
        async() => {
          const actual = await parse(scopeName, `'string'`);
          // console.log(JSON.stringify(actual, undefined, 2));

          expect(actual).toStrictEqual([
            { text: `'`, scopes: name(RuleName.SingleString, RuleName.StringBegin) },
            { text: 'string', scopes: name(RuleName.SingleString) },
            { text: `'`, scopes: name(RuleName.SingleString, RuleName.StringEnd) },
          ]);
        },
      );

      test(
        `escape sequences`,
        async() => {
          const actual = await parse(scopeName, `'${escapeSequencesInfo.singleQuote.join('')}'`);
          // console.log(JSON.stringify(actual, undefined, 2));

          expect(actual).toStrictEqual([
            { text: `'`, scopes: name(RuleName.SingleString, RuleName.StringBegin) },
            ...escapeSequencesInfo.singleQuote.map((escapeSequence) => {
              return { text: escapeSequence, scopes: name(RuleName.SingleString, RuleName.EscapeSequence) };
            }),
            { text: `'`, scopes: name(RuleName.SingleString, RuleName.StringEnd) },
          ]);
        },
      );

      test(
        `illegal`,
        async() => {
          const actual = await parse(scopeName, `'ab\r\nc\n'`);
          // console.log(JSON.stringify(actual, undefined, 2));

          expect(actual).toStrictEqual([
            { text: `'`, scopes: name(RuleName.SingleString, RuleName.StringBegin) },
            { text: 'a', scopes: name(RuleName.SingleString) },
            { text: 'b', scopes: name(RuleName.SingleString, StyleName.Invalid) },
            { text: 'c', scopes: name(RuleName.SingleString, StyleName.Invalid) },
            { text: `'`, scopes: name(RuleName.SingleString, RuleName.StringEnd) },
          ]);
        },
      );
    });
  });
  // #endregion literal
});

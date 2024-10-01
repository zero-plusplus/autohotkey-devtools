import { RuleName, ScopeName } from '../../src/types';
import { createUtilities } from '../../src/utils';
import { parse } from '../helpers/textmate-parser';

describe('expression', () => {
  const scopeName: ScopeName = 'autohotkey2';
  const { getEscapeSequencesInfo, name } = createUtilities(scopeName);
  const escapeSequencesInfo = getEscapeSequencesInfo();

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
        [
          '%"abc"%',
          [
            { text: '%', scopes: name(RuleName.Dereference, RuleName.DereferencePercentBegin) },
            { text: '"', scopes: name(RuleName.Dereference, RuleName.DoubleString, RuleName.StringBegin) },
            { text: 'abc', scopes: name(RuleName.Dereference, RuleName.DoubleString) },
            { text: '"', scopes: name(RuleName.Dereference, RuleName.DoubleString, RuleName.StringEnd) },
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
        [ '%', [ { text: '%', scopes: name(RuleName.Dereference, RuleName.DereferencePercentBegin, RuleName.InvalidDereferencePercent) } ] ],
        [
          '%a', [
            { text: '%', scopes: name(RuleName.Dereference, RuleName.DereferencePercentBegin) },
            { text: 'a', scopes: name(RuleName.Dereference, RuleName.Variable, RuleName.InvalidDereference) },
          ],
        ],
        [
          '%abc', [
            { text: '%', scopes: name(RuleName.Dereference, RuleName.DereferencePercentBegin) },
            { text: 'ab', scopes: name(RuleName.Dereference, RuleName.Variable) },
            { text: 'c', scopes: name(RuleName.Dereference, RuleName.Variable, RuleName.InvalidDereference) },
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
              return { text: escapeSequence, scopes: name(RuleName.SingleString, RuleName.SingleStringEscapeSequence) };
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
            { text: 'b', scopes: name(RuleName.SingleString, RuleName.InvalidSingleLineStringContent) },
            { text: '\r\n' },
            { text: 'c', scopes: name(RuleName.SingleString, RuleName.InvalidSingleLineStringContent) },
            { text: '\n' },
            { text: `'`, scopes: name(RuleName.SingleString, RuleName.StringEnd) },
          ]);
        },
      );
    });
  });
  // #endregion literal
});

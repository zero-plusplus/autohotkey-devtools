import { RuleDescriptor, RuleName, StyleName } from '../../src/constants';
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
            { text: '%', scopes: name(RuleName.PercentBegin) },
            { text: 'abc', scopes: name(RuleName.Variable) },
            { text: '%', scopes: name(RuleName.PercentEnd) },
          ],
        ],
        [
          '%A_ScriptDir%',
          [
            { text: '%', scopes: name(RuleName.PercentBegin) },
            { text: 'A_ScriptDir', scopes: name(RuleName.BuiltInVariable) },
            { text: '%', scopes: name(RuleName.PercentEnd) },
          ],
        ],
        [
          '%"abc"%',
          [
            { text: '%', scopes: name(RuleName.PercentBegin) },
            { text: '"', scopes: name(RuleName.DoubleString, RuleDescriptor.Begin) },
            { text: 'abc', scopes: name(RuleName.DoubleString) },
            { text: '"', scopes: name(RuleName.DoubleString, RuleDescriptor.End) },
            { text: '%', scopes: name(RuleName.PercentEnd) },
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
            { text: '%', scopes: name(RuleName.PercentBegin, StyleName.Invalid) },
            { text: '%', scopes: name(RuleName.PercentEnd, StyleName.Invalid) },
          ],
        ],
        [ '%', [ { text: '%', scopes: name(RuleName.PercentBegin, StyleName.Invalid) } ] ],
        [
          '%a', [
            { text: '%', scopes: name(RuleName.PercentBegin) },
            { text: 'a', scopes: name(RuleName.Variable, StyleName.Invalid) },
          ],
        ],
        [
          '%abc', [
            { text: '%', scopes: name(RuleName.PercentBegin) },
            { text: 'ab', scopes: name(RuleName.Variable) },
            { text: 'c', scopes: name(RuleName.Variable, StyleName.Invalid) },
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
            { text: `'`, scopes: name(RuleName.SingleString, RuleDescriptor.Begin) },
            { text: 'string', scopes: name(RuleName.SingleString) },
            { text: `'`, scopes: name(RuleName.SingleString, RuleDescriptor.End) },
          ]);
        },
      );

      test(
        `escape sequences`,
        async() => {
          const actual = await parse(scopeName, `'${escapeSequencesInfo.singleQuote.join('')}'`);
          // console.log(JSON.stringify(actual, undefined, 2));

          expect(actual).toStrictEqual([
            { text: `'`, scopes: name(RuleName.SingleString, RuleDescriptor.Begin) },
            ...escapeSequencesInfo.singleQuote.map((escapeSequence) => {
              return { text: escapeSequence, scopes: name(RuleName.SingleString, RuleName.EscapeSequence) };
            }),
            { text: `'`, scopes: name(RuleName.SingleString, RuleDescriptor.End) },
          ]);
        },
      );
    });
  });
  // #endregion literal
});

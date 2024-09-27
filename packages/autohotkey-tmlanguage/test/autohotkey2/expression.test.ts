import { RuleName, ScopeName } from '../../src/types';
import { createUtilities } from '../../src/utils';
import { parse } from '../helpers/textmate-parser';

describe('expression', () => {
  const scopeName: ScopeName = 'autohotkey2';
  const { getEscapeSequencesInfo, name } = createUtilities(scopeName);
  const escapeSequencesInfo = getEscapeSequencesInfo();

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
            { text: '\r\n', scopes: name(RuleName.SingleString, RuleName.InvalidStringNewLine) },
            { text: 'c', scopes: name(RuleName.SingleString, RuleName.InvalidSingleLineStringContent) },
            { text: '\n', scopes: name(RuleName.SingleString, RuleName.InvalidStringNewLine) },
            { text: `'`, scopes: name(RuleName.SingleString, RuleName.StringEnd) },
          ]);
        },
      );
    });
  });
  // #endregion literal
});

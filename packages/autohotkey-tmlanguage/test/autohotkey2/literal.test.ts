import { doubleStringEscapeSequences, singleStringEscapeSequences } from '../../src/autohotkey2/repository/literal';
import { RuleName, ScopeName } from '../../src/types';
import { createUtilities } from '../../src/utils';
import { parse } from '../helpers/textmate-parser';

describe.each([
  [ 'autohotkeynext' ],
  [ 'autohotkey2' ],
] as ScopeName[][])('literal', (scopeName) => {
  const { name } = createUtilities(scopeName);

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
      `escape sequences`,
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

    test(
      `illegal`,
      async() => {
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
      },
    );
  });

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
        const actual = await parse(scopeName, `'${singleStringEscapeSequences.join('')}'`);
        // console.log(JSON.stringify(actual, undefined, 2));

        expect(actual).toStrictEqual([
          { text: `'`, scopes: name(RuleName.SingleString, RuleName.StringBegin) },
          ...singleStringEscapeSequences.map((escapeSequence) => {
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

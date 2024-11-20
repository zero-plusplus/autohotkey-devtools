import { RuleName } from '../../src/constants';
import type { ScopeName } from '../../src/types';
import { createUtilities } from '../../src/utils';
import { parse } from '../helpers/textmate-parser';

describe.each([
  [ 'autohotkeynext' ],
  [ 'autohotkey2' ],
  [ 'autohotkeyl' ],
] as ScopeName[][])('comment', (scopeName) => {
  const { name } = createUtilities(scopeName);

  describe(`[${scopeName}] single-line comment`, () => {
    test.each([
      [ '; comment', [ { text: '; comment', scopes: name(RuleName.SingleLineComment) } ] ],
      [ '  ; comment', [ { text: '; comment', scopes: name(RuleName.SingleLineComment) } ] ],
    ])('valid', async(text, expected) => {
      const actual = await parse(scopeName, text);
      // console.log(JSON.stringify(actual, undefined, 2));

      expect(actual).toStrictEqual(expected);
    });
  });

  describe(`[${scopeName}] in-line comment`, () => {
    test.each([
      [
        'var ; comment', [
          { text: 'var', scopes: name(RuleName.Variable) },
          { text: '; comment', scopes: name(RuleName.InLineComment) },
        ],
      ],
    ])('valid', async(text, expected) => {
      const actual = await parse(scopeName, text);
      // console.log(JSON.stringify(actual, undefined, 2));

      expect(actual).toStrictEqual(expected);
    });
  });
});

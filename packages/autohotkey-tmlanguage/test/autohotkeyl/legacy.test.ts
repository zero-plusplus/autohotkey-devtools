import { Repository, RuleName } from '../../src/constants';
import type { ScopeName } from '../../src/types';
import { createUtilities, getEscapeSequencesInfo } from '../../src/utils';
import { parse } from '../helpers/textmate-parser';

describe('legacy', () => {
  const scopeName: ScopeName = 'autohotkeyl';
  const { name } = createUtilities(scopeName);
  const escapeSequencesInfo = getEscapeSequencesInfo(scopeName);

  describe(`[${scopeName}] legacy assignment`, () => {
    test.each([
      [
        'var = text', [
          { text: 'var', scopes: name(Repository.LegacyAssignment, RuleName.Variable) },
          { text: ' ' },
          { text: '=', scopes: name(Repository.LegacyAssignment, RuleName.Equals) },
          { text: ' ' },
          { text: 'text', scopes: name(Repository.LegacyAssignment, RuleName.LegacyText) },
        ],
      ],
      [
        `var = ${escapeSequencesInfo.legacyText.join('')}`, [
          { text: 'var', scopes: name(Repository.LegacyAssignment, RuleName.Variable) },
          { text: ' ' },
          { text: '=', scopes: name(Repository.LegacyAssignment, RuleName.Equals) },
          { text: ' ' },
          ...escapeSequencesInfo.legacyText.map((escapeSequence) => {
            return { text: escapeSequence, scopes: name(Repository.LegacyAssignment, RuleName.LegacyTextEscapeSequence) };
          }),
        ],
      ],
      [
        'var = a `; ; comment', [
          { text: 'var', scopes: name(Repository.LegacyAssignment, RuleName.Variable) },
          { text: ' ' },
          { text: '=', scopes: name(Repository.LegacyAssignment, RuleName.Equals) },
          { text: ' ' },
          { text: 'a ', scopes: name(Repository.LegacyAssignment, RuleName.LegacyText) },
          { text: '`;', scopes: name(Repository.LegacyAssignment, RuleName.LegacyTextEscapeSequence) },
          { text: ' ' },
          { text: '; comment', scopes: name(RuleName.InLineComment) },
        ],
      ],
      [
        'var = %var2%', [
          { text: 'var', scopes: name(Repository.LegacyAssignment, RuleName.Variable) },
          { text: ' ' },
          { text: '=', scopes: name(Repository.LegacyAssignment, RuleName.Equals) },
          { text: ' ' },
          { text: '%', scopes: name(Repository.LegacyAssignment, Repository.Dereference, RuleName.PercentBegin) },
          { text: 'var2', scopes: name(Repository.LegacyAssignment, Repository.Dereference, RuleName.Variable) },
          { text: '%', scopes: name(Repository.LegacyAssignment, Repository.Dereference, RuleName.PercentEnd) },
        ],
      ],
      [
        'var = % abc', [
          { text: 'var', scopes: name(Repository.LegacyAssignment, RuleName.Variable) },
          { text: ' ' },
          { text: '=', scopes: name(Repository.LegacyAssignment, RuleName.Equals) },
          { text: ' ' },
          { text: '%', scopes: name(Repository.LegacyAssignment, Repository.PercentExpression, RuleName.PercentBegin) },
          { text: ' ' },
          { text: 'abc', scopes: name(Repository.LegacyAssignment, Repository.PercentExpression, RuleName.Variable) },
        ],
      ],
      [
        'var = % (foo,bar)', [
          { text: 'var', scopes: name(Repository.LegacyAssignment, RuleName.Variable) },
          { text: ' ' },
          { text: '=', scopes: name(Repository.LegacyAssignment, RuleName.Equals) },
          { text: ' ' },
          { text: '%', scopes: name(Repository.LegacyAssignment, Repository.PercentExpression, RuleName.PercentBegin) },
          { text: ' ' },
          { text: '(', scopes: name(Repository.LegacyAssignment, Repository.PercentExpression, Repository.ParenthesizedExpression, RuleName.OpenParen) },
          { text: 'foo', scopes: name(Repository.LegacyAssignment, Repository.PercentExpression, Repository.ParenthesizedExpression, RuleName.Variable) },
          { text: ',', scopes: name(Repository.LegacyAssignment, Repository.PercentExpression, Repository.ParenthesizedExpression, RuleName.Separator) },
          { text: 'bar', scopes: name(Repository.LegacyAssignment, Repository.PercentExpression, Repository.ParenthesizedExpression, RuleName.Variable) },
          { text: ')', scopes: name(Repository.LegacyAssignment, Repository.PercentExpression, Repository.ParenthesizedExpression, RuleName.CloseParen) },
        ],
      ],
    ])('valid', async(text, expected) => {
      const actual = await parse(scopeName, text);
      // console.log(JSON.stringify(actual, undefined, 2));

      expect(actual).toStrictEqual(expected);
    });
  });
});

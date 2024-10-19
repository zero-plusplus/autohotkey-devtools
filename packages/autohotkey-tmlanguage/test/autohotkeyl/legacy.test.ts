import { RuleName } from '../../src/constants';
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
          { text: 'var', scopes: name(RuleName.LegacyAssignment, RuleName.Variable) },
          { text: ' ' },
          { text: '=', scopes: name(RuleName.LegacyAssignment, RuleName.Equals) },
          { text: ' ' },
          { text: 'text', scopes: name(RuleName.LegacyAssignment, RuleName.LegacyText) },
        ],
      ],
      [
        `var = ${escapeSequencesInfo.legacyText.join('')}`, [
          { text: 'var', scopes: name(RuleName.LegacyAssignment, RuleName.Variable) },
          { text: ' ' },
          { text: '=', scopes: name(RuleName.LegacyAssignment, RuleName.Equals) },
          { text: ' ' },
          ...escapeSequencesInfo.legacyText.map((escapeSequence) => {
            return { text: escapeSequence, scopes: name(RuleName.LegacyAssignment, RuleName.LegacyTextEscapeSequence) };
          }),
        ],
      ],
      [
        'var = a `; ; comment', [
          { text: 'var', scopes: name(RuleName.LegacyAssignment, RuleName.Variable) },
          { text: ' ' },
          { text: '=', scopes: name(RuleName.LegacyAssignment, RuleName.Equals) },
          { text: ' ' },
          { text: 'a ', scopes: name(RuleName.LegacyAssignment, RuleName.LegacyText) },
          { text: '`;', scopes: name(RuleName.LegacyAssignment, RuleName.LegacyTextEscapeSequence) },
          { text: ' ' },
          { text: '; comment', scopes: name(RuleName.InLineComment) },
        ],
      ],
      [
        'var = %var2%', [
          { text: 'var', scopes: name(RuleName.LegacyAssignment, RuleName.Variable) },
          { text: ' ' },
          { text: '=', scopes: name(RuleName.LegacyAssignment, RuleName.Equals) },
          { text: ' ' },
          { text: '%', scopes: name(RuleName.LegacyAssignment, RuleName.Dereference, RuleName.DereferencePercentBegin) },
          { text: 'var2', scopes: name(RuleName.LegacyAssignment, RuleName.Dereference, RuleName.Variable) },
          { text: '%', scopes: name(RuleName.LegacyAssignment, RuleName.Dereference, RuleName.DereferencePercentEnd) },
        ],
      ],
      [
        'var = % abc', [
          { text: 'var', scopes: name(RuleName.LegacyAssignment, RuleName.Variable) },
          { text: ' ' },
          { text: '=', scopes: name(RuleName.LegacyAssignment, RuleName.Equals) },
          { text: ' ' },
          { text: '%', scopes: name(RuleName.LegacyAssignment, RuleName.ForceExpression, RuleName.ForceExpressionPercent) },
          { text: ' ' },
          { text: 'abc', scopes: name(RuleName.LegacyAssignment, RuleName.ForceExpression, RuleName.Variable) },
        ],
      ],
      [
        'var = % (foo,bar)', [
          { text: 'var', scopes: name(RuleName.LegacyAssignment, RuleName.Variable) },
          { text: ' ' },
          { text: '=', scopes: name(RuleName.LegacyAssignment, RuleName.Equals) },
          { text: ' ' },
          { text: '%', scopes: name(RuleName.LegacyAssignment, RuleName.ForceExpression, RuleName.ForceExpressionPercent) },
          { text: ' ' },
          { text: '(', scopes: name(RuleName.LegacyAssignment, RuleName.ForceExpression, RuleName.ParenthesizedExpression, RuleName.OpenParen) },
          { text: 'foo', scopes: name(RuleName.LegacyAssignment, RuleName.ForceExpression, RuleName.ParenthesizedExpression, RuleName.Variable) },
          { text: ',', scopes: name(RuleName.LegacyAssignment, RuleName.ForceExpression, RuleName.ParenthesizedExpression, RuleName.Comma) },
          { text: 'bar', scopes: name(RuleName.LegacyAssignment, RuleName.ForceExpression, RuleName.ParenthesizedExpression, RuleName.Variable) },
          { text: ')', scopes: name(RuleName.LegacyAssignment, RuleName.ForceExpression, RuleName.ParenthesizedExpression, RuleName.CloseParen) },
        ],
      ],
    ])('valid', async(text, expected) => {
      const actual = await parse(scopeName, text);
      // console.log(JSON.stringify(actual, undefined, 2));

      expect(actual).toStrictEqual(expected);
    });
  });
});

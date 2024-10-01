import { RuleName, ScopeName } from '../../src/types';
import { createUtilities } from '../../src/utils';
import { parse } from '../helpers/textmate-parser';

describe('legacy', () => {
  const scopeName: ScopeName = 'autohotkeyl';
  const { name } = createUtilities(scopeName);

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
    ])('valid', async(text, expected) => {
      const actual = await parse(scopeName, text);
      // console.log(JSON.stringify(actual, undefined, 2));

      expect(actual).toStrictEqual(expected);
    });
  });
});

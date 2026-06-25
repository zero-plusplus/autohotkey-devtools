import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference.ts';
import { createKeywordInvalidExpectedDataList } from '../common/invalid.ts';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

export function $fileAttributes(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  const attributes = [ 'R', 'A', 'S', 'H', 'N', 'O', 'T' ];
  return [
    ...attributes.flatMap((attribute): ExpectedTestData[] => {
      return [
        createCommandExpectedData(
          scopeName,
          attribute,
          [ { text: attribute, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
        createCommandExpectedData(
          scopeName,
          `+${attribute}`,
          [ { text: `+${attribute}`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
        createCommandExpectedData(
          scopeName,
          `-${attribute}`,
          [ { text: `-${attribute}`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
        createCommandExpectedData(
          scopeName,
          `${attribute} XXX`,
          [
            { text: attribute, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'XXX', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
          ],
          placeholder,
        ),
      ];
    }),
    createCommandExpectedData(
      scopeName,
      `+${attributes.join('')}`,
      [ { text: `+${attributes.join('')}`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
      placeholder,
    ),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInKeywordParameterExpectedDataList(scopeName, placeholder),
    ...createKeywordInvalidExpectedDataList(scopeName, placeholder),
  ];
}

import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference';
import { createKeywordInvalidExpectedDataList } from '../common/invalid';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression';
import { createExpectedData, type Placeholder } from '../helpers';

export function $fileAttributes(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  const attributes = [ 'R', 'A', 'S', 'H', 'N', 'O', 'T' ];
  return [
    ...attributes.flatMap((attribute): ExpectedTestData[] => {
      return [
        createExpectedData(
          scopeName,
          attribute,
          [ { text: attribute, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
        createExpectedData(
          scopeName,
          `+${attribute}`,
          [ { text: `+${attribute}`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
        createExpectedData(
          scopeName,
          `-${attribute}`,
          [ { text: `-${attribute}`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
        createExpectedData(
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
    createExpectedData(
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

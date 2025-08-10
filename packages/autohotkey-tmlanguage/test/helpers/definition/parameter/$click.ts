import { isIntegerLike } from '@zero-plusplus/utilities/src';
import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData, ParsedResult } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';
import { createDereferenceInKeywordParameterExpectedDataList } from '../options/dereference';
import { createKeywordInvalidExpectedDataList } from '../options/invalid';
import { createPercentExpressionParameterExpectedDataList } from '../options/percentExpression';

export function $click(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...[
      [ '2' ],
      [ '100', '200', 'Left' ],
      [ '100', '200', 'L' ],
      [ '100', '200', 'Right' ],
      [ '100', '200', 'R' ],
      [ '100', '200', 'Middle' ],
      [ '100', '200', 'M' ],
      [ '100', '200', 'X1' ],
      [ '100', '200', 'X2' ],
      [ '100', '200', 'Up' ],
      [ '100', '200', 'U' ],
      [ '100', '200', 'Down' ],
      [ '100', '200', 'D' ],
      [ '100', '200', '0' ],
      [ '100', '200', 'Relative' ],
    ].flatMap((options): ExpectedTestData[] => {
      return [
        createExpectedData(
          scopeName,
          options.join(' '),
          [
            ...options.map((option): ParsedResult => {
              return isIntegerLike(option)
                ? { text: option, scopes: name(scopeName, RuleName.Integer) }
                : { text: option, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) };
            }),
          ],
          placeholder,
        ),
      ];
    }),
    ...createKeywordInvalidExpectedDataList(scopeName, placeholder),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInKeywordParameterExpectedDataList(scopeName, placeholder),
  ];
}

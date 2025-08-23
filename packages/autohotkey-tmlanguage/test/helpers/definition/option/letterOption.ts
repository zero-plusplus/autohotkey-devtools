import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';

export function letterOption(scopeName: ScopeName, letters: string[], placeholder: Placeholder): ExpectedTestData[] {
  return [
    createExpectedData(
      scopeName,
      letters.join(''),
      [ { text: letters.join(''), scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
      placeholder,
    ),
  ];
}

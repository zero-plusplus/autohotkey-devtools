import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

export function $includeLib(scopeName: ScopeName, placeholder: CommandPlaceholder, additionalExpectedTestDataBuilder = (placeholder: CommandPlaceholder): ExpectedTestData[] => ([])): ExpectedTestData[] {
  return [
    createCommandExpectedData(
      scopeName,
      `<LIBRARY>`,
      [
        { text: '<', scopes: name(scopeName, RuleName.OpenAngleBracket) },
        { text: 'LIBRARY', scopes: name(scopeName, RuleName.IncludeLibrary) },
        { text: '>', scopes: name(scopeName, RuleName.CloseAngleBracket) },
      ],
      placeholder,
    ),
    createCommandExpectedData(
      scopeName,
      `path\\to\\, file .ahk`,
      [
        { text: 'path\\to\\,', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: 'file', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '.ahk', scopes: name(scopeName, RuleName.UnquotedString) },
      ],
      placeholder,
    ),
    createCommandExpectedData(
      scopeName,
      `.\\path\\to\\, file .ahk`,
      [
        { text: '.\\path\\to\\,', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: 'file', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '.ahk', scopes: name(scopeName, RuleName.UnquotedString) },
      ],
      placeholder,
    ),
    createCommandExpectedData(
      scopeName,
      `%A_LineFile%\\..\\file.ahk`,
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'A_LineFile', scopes: name(scopeName, RuleName.BuiltInVariable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '\\..\\file.ahk', scopes: name(scopeName, RuleName.UnquotedString) },
      ],
      placeholder,
    ),
  ];
}

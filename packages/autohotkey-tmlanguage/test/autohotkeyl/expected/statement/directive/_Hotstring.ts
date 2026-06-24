import { name, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage.ts';
import { createCommandExpectedData } from '../../../../helpers/definition/helpers.ts';
import { decimalOption } from '../../../../helpers/definition/option/decimalOption.ts';
import { keywordOption } from '../../../../helpers/definition/option/keywordOption.ts';
import { signedDecimalOption } from '../../../../helpers/definition/option/signedDecimalOption.ts';
import { toggleOption } from '../../../../helpers/definition/option/toggleOption.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/_Hotstring.htm
export function createHotstringExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#Hotstring';

  return [
    ...((placeholder = { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }): ExpectedTestData[] => {
      return [
        ...$(scopeName, placeholder),
        ...keywordOption(scopeName, [ 'NoMouse', 'EndChars', 'SI', 'SP', 'SE', 'X' ], placeholder),
        ...toggleOption(scopeName, [ '*', '?', 'B', 'C', 'O', 'R', 'T', 'Z' ], placeholder),
        ...decimalOption(scopeName, [ 'P' ], placeholder),
        ...signedDecimalOption(scopeName, [ 'K' ], placeholder),
        createCommandExpectedData(
          scopeName,
          `EndChars ,\`t`,
          [
            { text: 'EndChars', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: ',', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '`t', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) },
          ],
          placeholder,
        ),
      ];
    })(),
  ];
}

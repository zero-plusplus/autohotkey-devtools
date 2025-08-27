import { name, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
import { createExpectedData } from '../../../../helpers/definition/helpers';
import { decimalOption } from '../../../../helpers/definition/option/decimalOption';
import { keywordOption } from '../../../../helpers/definition/option/keywordOption';
import { signedFloatOption } from '../../../../helpers/definition/option/signedFloatOption';
import { toggleOption } from '../../../../helpers/definition/option/toggleOption';
import { $ } from '../../../../helpers/definition/parameter/$';
import type { ExpectedTestData } from '../../../../types';

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
        ...signedFloatOption(scopeName, [ 'K' ], placeholder),
        createExpectedData(
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

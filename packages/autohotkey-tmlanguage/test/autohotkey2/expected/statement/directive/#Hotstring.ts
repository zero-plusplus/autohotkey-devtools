import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v2/lib/_Hotstring.htm
export function createHotstringExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#Hotstring';

  return [
    [
      dedent`
        ${directiveName} NoMouse              ; comment
        ${directiveName} EndChars ,\`t        ; comment
        ${directiveName} B0 C1                ; comment
      `,
      [
        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: 'NoMouse', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: 'EndChars', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '`t', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: 'B0', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'C1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ${directiveName} %var%                 ; comment
        ${directiveName} %var%var%var%         ; comment
      `,
      [
        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

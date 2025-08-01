import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_IfWinActive.htm
export function createIfWinActiveExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return [ '#IfWinActive', '#IfWinExist', '#IfWinNotActive', '#IfWinNotExist' ].flatMap((directiveName): ExpectedTestData[] => {
    return [
      [
        dedent`
          ${directiveName} ahk_exe Code.exe           ; comment
          ${directiveName}, ahk_exe Code.exe           ; comment
        `,
        [
          { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
          { text: 'ahk_exe', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
          { text: 'Code.exe', scopes: name(scopeName, RuleName.UnquotedString) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

          { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: 'ahk_exe', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
          { text: 'Code.exe', scopes: name(scopeName, RuleName.UnquotedString) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],
      ],
      [
        dedent`
          ${directiveName}, % var                 ; comment
          ${directiveName}, %var%                 ; comment
          ${directiveName}, %var%var%var%         ; comment
        `,
        [
          { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
          { text: 'var', scopes: name(scopeName, RuleName.Variable) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

          { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
          { text: 'var', scopes: name(scopeName, RuleName.Variable) },
          { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

          { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
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
  });
}

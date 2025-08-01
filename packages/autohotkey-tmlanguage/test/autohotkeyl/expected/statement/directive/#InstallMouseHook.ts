import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_InstallMouseHook.htm
export function createInstallMouseHookExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#InstallMouseHook';

  return [
    [
      dedent`
        ${directiveName}  invalid       ; comment
        ${directiveName}, invalid       ; comment
      `,
      [
        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ${directiveName}, % var               ; comment
        ${directiveName}, %var%               ; comment
        ${directiveName}, %var%var%var%       ; comment
      `,
      [
        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '%', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: 'var', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '%var%', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '%var%var%var%', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

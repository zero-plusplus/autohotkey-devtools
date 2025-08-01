import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_AllowSameLineComments.htm
export function createAllowSameLineCommentsExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#AllowSameLineComments';

  return [
    [
      dedent`
        ${directiveName}, invalid       ; comment
      `,
      [
        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName, StyleName.Invalid, StyleName.Strikethrough) },
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
        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName, StyleName.Invalid, StyleName.Strikethrough) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '%', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: 'var', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName, StyleName.Invalid, StyleName.Strikethrough) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '%var%', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName, StyleName.Invalid, StyleName.Strikethrough) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '%var%var%var%', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

import { dedent } from '@zero-plusplus/utilities/src/index.ts';
import { name, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/alpha/lib/_StructPack.htm
export function createStructPackExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#StructPack';

  return [
    [
      dedent`
        ${directiveName} 123 ; comment
      `,
      [
        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],

    [
      dedent`
        ${directiveName} invalid ; comment
      `,
      [
        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

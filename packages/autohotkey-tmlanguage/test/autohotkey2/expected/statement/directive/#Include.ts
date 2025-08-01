import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v2/lib/_Include.htm
export function createIncludeExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return [ '#Include', '#IncludeAgain' ].flatMap((directive): ExpectedTestData[] => {
    return [
      [
        dedent`
          ${directive} <LIBRARY>      ; comment
        `,
        [
          { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
          { text: '<', scopes: name(scopeName, RuleName.OpenAngleBracket) },
          { text: 'LIBRARY', scopes: name(scopeName, RuleName.IncludeLibrary) },
          { text: '>', scopes: name(scopeName, RuleName.CloseAngleBracket) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],
      ],
      [
        dedent`
          ${directive} path\\to\\, file .ahk      ; comment
        `,
        [
          { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
          { text: 'path\\to\\,', scopes: name(scopeName, RuleName.UnquotedString) },
          { text: 'file', scopes: name(scopeName, RuleName.UnquotedString) },
          { text: '.ahk', scopes: name(scopeName, RuleName.UnquotedString) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],
      ],
      [
        dedent`
          ${directive} .\\path\\to\\, file .ahk       ; comment
        `,
        [
          { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
          { text: '.\\path\\to\\,', scopes: name(scopeName, RuleName.UnquotedString) },
          { text: 'file', scopes: name(scopeName, RuleName.UnquotedString) },
          { text: '.ahk', scopes: name(scopeName, RuleName.UnquotedString) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],
      ],
      [
        dedent`
          ${directive} %A_LineFile%\\..\\file.ahk     ; comment
        `,
        [
          { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
          { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
          { text: 'A_LineFile', scopes: name(scopeName, RuleName.BuiltInVariable) },
          { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
          { text: '\\..\\file.ahk', scopes: name(scopeName, RuleName.UnquotedString) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],
      ],
    ];
  });
}

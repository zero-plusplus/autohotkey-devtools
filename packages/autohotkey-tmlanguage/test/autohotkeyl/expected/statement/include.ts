import { dedent } from '@zero-plusplus/utilities/src';
import { Repository, RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createIncludeStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        #Include <LIBRARY> ; inline comment
        #IncludeAgain <LIBRARY> ; inline comment
      `,
      [
        { text: '#Include', scopes: name(scopeName, Repository.IncludeStatement, RuleName.DirectiveName) },
        { text: '<', scopes: name(scopeName, Repository.IncludeStatement, RuleName.OpenAngleBracket) },
        { text: 'LIBRARY', scopes: name(scopeName, Repository.IncludeStatement, RuleName.UnquotedString) },
        { text: '>', scopes: name(scopeName, Repository.IncludeStatement, RuleName.CloseAngleBracket) },
        { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '#IncludeAgain', scopes: name(scopeName, Repository.IncludeStatement, RuleName.DirectiveName) },
        { text: '<', scopes: name(scopeName, Repository.IncludeStatement, RuleName.OpenAngleBracket) },
        { text: 'LIBRARY', scopes: name(scopeName, Repository.IncludeStatement, RuleName.UnquotedString) },
        { text: '>', scopes: name(scopeName, Repository.IncludeStatement, RuleName.CloseAngleBracket) },
        { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
    [
      dedent`
        #Include path\\to\\ file .ahk ; inline comment
        #IncludeAgain path\\to\\ file .ahk ; inline comment
      `,
      [
        { text: '#Include', scopes: name(scopeName, Repository.IncludeStatement, RuleName.DirectiveName) },
        { text: 'path\\to\\ file .ahk', scopes: name(scopeName, Repository.IncludeStatement, RuleName.UnquotedString) },
        { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '#IncludeAgain', scopes: name(scopeName, Repository.IncludeStatement, RuleName.DirectiveName) },
        { text: 'path\\to\\ file .ahk', scopes: name(scopeName, Repository.IncludeStatement, RuleName.UnquotedString) },
        { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
    [
      dedent`
        #Include %A_LineFile%\\..\\file.ahk ; inline comment
        #IncludeAgain %A_LineFile%\\..\\file.ahk ; inline comment
      `,
      [
        { text: '#Include', scopes: name(scopeName, Repository.IncludeStatement, RuleName.DirectiveName) },
        { text: '%', scopes: name(scopeName, Repository.IncludeStatement, RuleName.PercentBegin) },
        { text: 'A_LineFile', scopes: name(scopeName, Repository.IncludeStatement, RuleName.BuiltInVariable) },
        { text: '%', scopes: name(scopeName, Repository.IncludeStatement, RuleName.PercentEnd) },
        { text: '\\..\\file.ahk', scopes: name(scopeName, Repository.IncludeStatement, RuleName.UnquotedString) },
        { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '#IncludeAgain', scopes: name(scopeName, Repository.IncludeStatement, RuleName.DirectiveName) },
        { text: '%', scopes: name(scopeName, Repository.IncludeStatement, RuleName.PercentBegin) },
        { text: 'A_LineFile', scopes: name(scopeName, Repository.IncludeStatement, RuleName.BuiltInVariable) },
        { text: '%', scopes: name(scopeName, Repository.IncludeStatement, RuleName.PercentEnd) },
        { text: '\\..\\file.ahk', scopes: name(scopeName, Repository.IncludeStatement, RuleName.UnquotedString) },
        { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

import { Repository, RuleName } from '../../../src/constants';
import type { ScopeName } from '../../../src/types';
import { name } from '../../../src/utils';
import type { ExpectedTestData } from '../../types';

export function createIncludeStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...[ '#Include', '#IncludeAgain' ].flatMap((directive): ExpectedTestData[] => {
      return [
        [
          `${directive} <LIBRARY> ; inline comment`,
          [
            { text: directive, scopes: name(scopeName, Repository.IncludeStatement, RuleName.DirectiveName) },
            { text: '<', scopes: name(scopeName, Repository.IncludeStatement, RuleName.OpenAngleBracket) },
            { text: 'LIBRARY', scopes: name(scopeName, Repository.IncludeStatement, RuleName.UnquotedString) },
            { text: '>', scopes: name(scopeName, Repository.IncludeStatement, RuleName.CloseAngleBracket) },
            { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          `${directive} path\\to\\, file .ahk ; inline comment`,
          [
            { text: directive, scopes: name(scopeName, Repository.IncludeStatement, RuleName.DirectiveName) },
            { text: 'path\\to\\, file .ahk', scopes: name(scopeName, Repository.IncludeStatement, RuleName.UnquotedString) },
            { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          `${directive} .\\path\\to\\, file .ahk ; inline comment`,
          [
            { text: directive, scopes: name(scopeName, Repository.IncludeStatement, RuleName.DirectiveName) },
            { text: '.\\path\\to\\, file .ahk', scopes: name(scopeName, Repository.IncludeStatement, RuleName.UnquotedString) },
            { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          `${directive} %A_LineFile%\\..\\file.ahk ; inline comment`,
          [
            { text: directive, scopes: name(scopeName, Repository.IncludeStatement, RuleName.DirectiveName) },
            { text: '%', scopes: name(scopeName, Repository.IncludeStatement, RuleName.PercentBegin) },
            { text: 'A_LineFile', scopes: name(scopeName, Repository.IncludeStatement, RuleName.BuiltInVariable) },
            { text: '%', scopes: name(scopeName, Repository.IncludeStatement, RuleName.PercentEnd) },
            { text: '\\..\\file.ahk', scopes: name(scopeName, Repository.IncludeStatement, RuleName.UnquotedString) },
            { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    }),
  ];
}

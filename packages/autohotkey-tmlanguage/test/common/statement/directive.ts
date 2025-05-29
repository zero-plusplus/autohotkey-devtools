import { hasFlag } from '@zero-plusplus/utilities/src';
import {
  CommandFlag,
  type CommandDefinition,
} from '../../../src/definitions';
import {
  name, RuleName, StyleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

interface Placeholder {
  directiveDefinitions: CommandDefinition[];
}
export function createDirectiveStatementExpectedData(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...placeholder.directiveDefinitions.map((definition): ExpectedTestData => {
      return [
        definition.name,
        [
          {
            text: definition.name,
            scopes: hasFlag(definition.flags, CommandFlag.Deprecated)
              ? name(scopeName, RuleName.DirectiveName, StyleName.Strikethrough)
              : name(scopeName, RuleName.DirectiveName),
          },
        ],
      ];
    }),

    ...[ '#Include', '#IncludeAgain' ].flatMap((directive): ExpectedTestData[] => {
      return [
        [
          `${directive} <LIBRARY> ; inline comment`,
          [
            { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '<', scopes: name(scopeName, RuleName.OpenAngleBracket) },
            { text: 'LIBRARY', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '>', scopes: name(scopeName, RuleName.CloseAngleBracket) },
            { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          `${directive} path\\to\\, file .ahk ; inline comment`,
          [
            { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'path\\to\\, file .ahk', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          `${directive} .\\path\\to\\, file .ahk ; inline comment`,
          [
            { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '.\\path\\to\\, file .ahk', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          `${directive} %A_LineFile%\\..\\file.ahk ; inline comment`,
          [
            { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'A_LineFile', scopes: name(scopeName, RuleName.BuiltInVariable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '\\..\\file.ahk', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    }),

    [
      `#Requires AutoHotkey v2.1 ; inline comment`,
      [
        { text: '#Requires', scopes: name(scopeName, RuleName.DirectiveName) },
        { text: 'AutoHotkey', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'v2.1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; inline comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

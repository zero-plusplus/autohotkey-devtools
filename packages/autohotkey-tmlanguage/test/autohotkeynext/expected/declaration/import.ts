import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleDescriptor, RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createImportDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        import "path/to"                ; comment
        import "path/to" as x           ; comment
        Import x                        ; comment
        Import x As xx                  ; comment
      `,
      [
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'Import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'Import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: 'As', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'xx', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        export import "path/to"                           ; comment
        Export Import "path/to" as x                      ; comment
        export import x                                   ; comment
        export import x { *, y, z as zz }                 ; comment
        export import x as xx                             ; comment
        export import x as xx { *, y, z as zz }           ; comment
      `,
      [
        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'Export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'Import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: '*', scopes: name(scopeName, RuleName.ImportExportAll) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'y', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'z', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'zz', scopes: name(scopeName, RuleName.Variable) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'xx', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'xx', scopes: name(scopeName, RuleName.Variable) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: '*', scopes: name(scopeName, RuleName.ImportExportAll) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'y', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'z', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'zz', scopes: name(scopeName, RuleName.Variable) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        import { y as z } from "path/to"                ; comment
        Import { y As z, a As b } From "path/to"        ; comment
        import {                                        ; comment
          y as z,                                       ; comment
          a as b,                                       ; comment
        } from "path/to"                                ; comment
      `,
      [
        ...[
          { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
          { text: 'y', scopes: name(scopeName, RuleName.Variable) },
          { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
          { text: 'z', scopes: name(scopeName, RuleName.Variable) },
          { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
          { text: 'from', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
          { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
          { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],

        ...[
          { text: 'Import', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
          { text: 'y', scopes: name(scopeName, RuleName.Variable) },
          { text: 'As', scopes: name(scopeName, RuleName.KeywordInExpression) },
          { text: 'z', scopes: name(scopeName, RuleName.Variable) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: 'a', scopes: name(scopeName, RuleName.Variable) },
          { text: 'As', scopes: name(scopeName, RuleName.KeywordInExpression) },
          { text: 'b', scopes: name(scopeName, RuleName.Variable) },
          { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
          { text: 'From', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
          { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
          { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],

        ...[
          { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

          { text: 'y', scopes: name(scopeName, RuleName.Variable) },
          { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
          { text: 'z', scopes: name(scopeName, RuleName.Variable) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

          { text: 'a', scopes: name(scopeName, RuleName.Variable) },
          { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
          { text: 'b', scopes: name(scopeName, RuleName.Variable) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

          { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
          { text: 'from', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
          { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
          { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],
      ],
    ],
    [
      dedent`
        import * from "path/to"       ; comment
      `,
      [
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '*', scopes: name(scopeName, RuleName.ImportExportAll) },
        { text: 'from', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

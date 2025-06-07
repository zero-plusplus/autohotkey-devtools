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
        import x                        ; comment
        import x as xx                  ; comment
      `, [
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'xx', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
    [
      dedent`
        export import "path/to"                           ; comment
        export import "path/to" as x                      ; comment
        export import x                                   ; comment
        export import x { *, y, z as zz }                 ; comment
        export import x as xx                             ; comment
        export import x as xx { *, y, z as zz }           ; comment
      `, [
        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

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
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'xx', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

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
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
    [
      dedent`
        import { y as z } from "path/to"                ; comment
        import { y as z, a as b } from "path/to"        ; comment
        import {                                        ; comment
          y as z,                                       ; comment
          a as b,                                       ; comment
        } from "path/to"                                ; comment
      `, [
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
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
        ],

        ...[
          { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
          { text: 'y', scopes: name(scopeName, RuleName.Variable) },
          { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
          { text: 'z', scopes: name(scopeName, RuleName.Variable) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: 'a', scopes: name(scopeName, RuleName.Variable) },
          { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
          { text: 'b', scopes: name(scopeName, RuleName.Variable) },
          { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
          { text: 'from', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
          { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
          { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
        ],

        ...[
          { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

          { text: 'y', scopes: name(scopeName, RuleName.Variable) },
          { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
          { text: 'z', scopes: name(scopeName, RuleName.Variable) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

          { text: 'a', scopes: name(scopeName, RuleName.Variable) },
          { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
          { text: 'b', scopes: name(scopeName, RuleName.Variable) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

          { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
          { text: 'from', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
          { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
          { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
          { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
        ],
      ],
    ],
    [
      dedent`
        import * from "path/to"       ; comment
      `, [
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '*', scopes: name(scopeName, RuleName.ImportExportAll) },
        { text: 'from', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}

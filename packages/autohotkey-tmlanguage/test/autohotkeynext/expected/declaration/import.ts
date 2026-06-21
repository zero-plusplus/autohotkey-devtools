import { dedent } from '@zero-plusplus/utilities/src';
import {
  name,
  RuleDescriptor,
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createImportDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        #import "path/to"                ; comment
        #import "path/to" as x           ; comment
        #Import x                        ; comment
        #Import x As xx                  ; comment
      `,
      [
        { text: '#import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '#import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '#Import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '#Import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: 'As', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'xx', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        #import export "path/to"                           ; comment
        #Import Export "path/to" as x                      ; comment
        #import export x                                   ; comment
        #import export x { *, y, z as zz }                 ; comment
        #import export x as xx                             ; comment
        #import export x as xx { *, y, z as zz }           ; comment
      `,
      [
        { text: '#import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '#Import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'Export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '#import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '#import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
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

        { text: '#import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'xx', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '#import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
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
        #import "path/to" { y as z }                ; comment
        #Import "path/to" { y As z, a As b }        ; comment
        #import "path/to" {                         ; comment
          y as z,                                   ; comment
          a as b,                                   ; comment
        }                                           ; comment
      `,
      [
        ...[
          { text: '#import', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
          { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
          { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
          { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
          { text: 'y', scopes: name(scopeName, RuleName.Variable) },
          { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
          { text: 'z', scopes: name(scopeName, RuleName.Variable) },
          { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],

        ...[
          { text: '#Import', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
          { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
          { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
          { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
          { text: 'y', scopes: name(scopeName, RuleName.Variable) },
          { text: 'As', scopes: name(scopeName, RuleName.KeywordInExpression) },
          { text: 'z', scopes: name(scopeName, RuleName.Variable) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: 'a', scopes: name(scopeName, RuleName.Variable) },
          { text: 'As', scopes: name(scopeName, RuleName.KeywordInExpression) },
          { text: 'b', scopes: name(scopeName, RuleName.Variable) },
          { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],

        ...[
          { text: '#import', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
          { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
          { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

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
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],
      ],
    ],
  ];
}

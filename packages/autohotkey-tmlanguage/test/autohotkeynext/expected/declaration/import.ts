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
        import "path/to"
        import "path/to" as x
        import x
        import x as xx
      `, [
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },

        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },

        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'xx', scopes: name(scopeName, RuleName.Variable) },
      ],
    ],
    [
      dedent`
        export import "path/to"
        export import "path/to" as x
        export import x
        export import x { *, y, z as zz }
        export import x as xx
        export import x as xx { *, y, z as zz }
      `, [
        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },

        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },

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

        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'xx', scopes: name(scopeName, RuleName.Variable) },

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

      ],
    ],
    [
      dedent`
        import { y as z } from "path/to"
        import { y as z, a as b } from "path/to"
        import {
          y as z,
          a as b,
        } from "path/to"
      `, [
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

        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: 'y', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'z', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: 'from', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
      ],
    ],
    [
      dedent`
        import * from "path/to"
      `, [
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '*', scopes: name(scopeName, RuleName.ImportExportAll) },
        { text: 'from', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
      ],
    ],
  ];
}

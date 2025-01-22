import { dedent } from '@zero-plusplus/utilities/src';
import { RuleDescriptor, RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createImportDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        import x
        import * from x

        import { y as z } from x
        import { y as z, a as b } from x
        import {
          y as z,
          a as b,
        } from x
      `, [
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },

        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '*', scopes: name(scopeName, RuleName.Operator) },
        { text: 'from', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },

        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: 'y', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'z', scopes: name(scopeName, RuleName.Variable) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: 'from', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },

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
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },

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
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
      ],
    ],
    [
      dedent`
        import * from "path/to"

        import { y as z } from "path/to"
        import { y as z, a as b } from "path/to"
        import {
          y as z,
          a as b,
        } from "path/to"
      `, [
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '*', scopes: name(scopeName, RuleName.Operator) },
        { text: 'from', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

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
  ];
}

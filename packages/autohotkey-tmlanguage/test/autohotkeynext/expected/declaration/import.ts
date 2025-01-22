import { dedent } from '@zero-plusplus/utilities/src';
import { RuleDescriptor, RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createImportDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        import X
        import * from X

        import { Y as Z } from X
        import { Y as Z, A as B } from X
        import {
          Y as Z,
          A as B,
        } from X
      `, [
        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'X', scopes: name(scopeName, RuleName.Variable) },

        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '*', scopes: name(scopeName, RuleName.Operator) },
        { text: 'from', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'X', scopes: name(scopeName, RuleName.Variable) },

        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: 'Y', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'Z', scopes: name(scopeName, RuleName.Variable) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: 'from', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'X', scopes: name(scopeName, RuleName.Variable) },

        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: 'Y', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'Z', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'A', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'B', scopes: name(scopeName, RuleName.Variable) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: 'from', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'X', scopes: name(scopeName, RuleName.Variable) },

        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: 'Y', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'Z', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'A', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'B', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: 'from', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'X', scopes: name(scopeName, RuleName.Variable) },
      ],
    ],
    [
      dedent`
        import * from "path/to"

        import { Y as Z } from "path/to"
        import { Y as Z, A as B } from "path/to"
        import {
          Y as Z,
          A as B,
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
        { text: 'Y', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'Z', scopes: name(scopeName, RuleName.Variable) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: 'from', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: 'Y', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'Z', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'A', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'B', scopes: name(scopeName, RuleName.Variable) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: 'from', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path/to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

        { text: 'import', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: 'Y', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'Z', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'A', scopes: name(scopeName, RuleName.Variable) },
        { text: 'as', scopes: name(scopeName, RuleName.KeywordInExpression) },
        { text: 'B', scopes: name(scopeName, RuleName.Variable) },
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

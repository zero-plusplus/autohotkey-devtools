import { dedent } from '@zero-plusplus/utilities/src';
import { builtInFunctionNames, deprecatedBuiltinFunctionNames } from '../../../../src/autohotkey2/constants';
import { RuleDescriptor, RuleName, StyleName } from '../../../../src/constants';
import { name } from '../../../../src/tmlanguage';
import type { ScopeName } from '../../../../src/types';
import type { ExpectedTestData } from '../../../types';

export function createCallStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        Abc
        Abc, "arg1" ; comment

        Abc {
          key: value
        }
      `,
      [
        { text: 'Abc', scopes: name(scopeName, RuleName.FunctionName) },

        { text: 'Abc', scopes: name(scopeName, RuleName.FunctionName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'arg1', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Abc', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: 'key', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'value', scopes: name(scopeName, RuleName.Variable) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
      ],
    ],
    ...builtInFunctionNames.map((functionName): ExpectedTestData => {
      return [ functionName, [ { text: functionName, scopes: name(scopeName, RuleName.FunctionName) } ] ];
    }),
    ...deprecatedBuiltinFunctionNames.map((functionName): ExpectedTestData => {
      return [ functionName, [ { text: functionName, scopes: name(scopeName, RuleName.FunctionName, StyleName.Strikethrough) } ] ];
    }),
  ];
}

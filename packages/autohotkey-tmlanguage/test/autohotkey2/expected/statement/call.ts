import { dedent } from '@zero-plusplus/utilities/src';
import { builtInFunctionNames, deprecatedBuiltinFunctionNames } from '../../../../src/autohotkey2/constants';
import { RuleDescriptor, RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createCallStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        Abc
        Abc, "arg1" ; comment
      `,
      [
        { text: 'Abc', scopes: name(scopeName, RuleName.FunctionName) },

        { text: 'Abc', scopes: name(scopeName, RuleName.FunctionName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'arg1', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
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

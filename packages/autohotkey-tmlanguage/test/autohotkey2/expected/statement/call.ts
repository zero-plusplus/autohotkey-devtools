import { dedent } from '@zero-plusplus/utilities/src';
import { builtInFunctionNames, deprecatedBuiltinFunctionNames } from '../../../../src/autohotkey2/constants';
import {
  name, RuleDescriptor, RuleName, StyleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createCallStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // one line
    ...((): ExpectedTestData[] => {
      return [
        ...builtInFunctionNames.map((functionName): ExpectedTestData => {
          return [
            dedent`
              ${functionName}        ; comment
            `,
            [
              { text: functionName, scopes: name(scopeName, RuleName.FunctionName) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            ],
          ];
        }),
        ...deprecatedBuiltinFunctionNames.map((functionName): ExpectedTestData => {
          return [
            dedent`
              ${functionName}        ; comment
            `,
            [
              { text: functionName, scopes: name(scopeName, RuleName.FunctionName, StyleName.Strikethrough) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            ],
          ];
        }),
        [
          dedent`
            Abc "arg1"                              ; comment
            Abc, "arg1"                             ; comment
          `,
          [
            { text: 'Abc', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
            { text: 'arg1', scopes: name(scopeName, RuleName.DoubleString) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'Abc', scopes: name(scopeName, RuleName.FunctionName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
            { text: 'arg1', scopes: name(scopeName, RuleName.DoubleString) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            Abc, [ "arg1", 123 ], { key: value }        ; comment
          `,
          [
            { text: 'Abc', scopes: name(scopeName, RuleName.FunctionName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
            { text: 'arg1', scopes: name(scopeName, RuleName.DoubleString) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: 'value', scopes: name(scopeName, RuleName.Variable) },
            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    })(),

    // continuation
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            Abc {             ; comment
              key: value      ; comment
            }, [ 1,           ; comment
              2               ; comment
              , 3,            ; comment
            ],                ; comment
          `,
          [
            { text: 'Abc', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: 'value', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '3', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    })(),
  ];
}

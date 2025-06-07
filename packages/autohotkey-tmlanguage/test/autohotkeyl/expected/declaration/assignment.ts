import { dedent } from '@zero-plusplus/utilities/src';
import * as constants_common from '../../../../src/common/constants';
import {
  name, RuleDescriptor, RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import * as common from '../../../common/declaration/assignment';
import type { ExpectedTestData } from '../../../types';

export function createAssignmentDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createAssignmentDeclarationExpectedData(scopeName, {
      modifiers: constants_common.accessModifiers,
      operators: constants_common.assignmentOperators,
    }),

    // lefthand
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            input := 1                    ; comment
            inputABC := 1                 ; comment
          `,
          [
            { text: 'input', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'inputABC', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            input["abc", 2] := 1            ; comment
            inputABC["abc", 2] := 1         ; comment
          `,
          [
            { text: 'input', scopes: name(scopeName, RuleName.Variable) },
            { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
            { text: 'abc', scopes: name(scopeName, RuleName.DoubleString) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'inputABC', scopes: name(scopeName, RuleName.Variable) },
            { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
            { text: 'abc', scopes: name(scopeName, RuleName.DoubleString) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            input.abc := 1            ; comment
          `,
          [
            { text: 'input', scopes: name(scopeName, RuleName.Variable) },
            { text: '.', scopes: name(scopeName, RuleName.Dot) },
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            %input% := 1                ; comment
            %input%abc := 1             ; comment
          `,
          [
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'input', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'input', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            input.abc[1].%abc% := 1         ; comment
          `,
          [
            { text: 'input', scopes: name(scopeName, RuleName.Variable) },
            { text: '.', scopes: name(scopeName, RuleName.Dot) },
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: '.', scopes: name(scopeName, RuleName.Dot) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    })(),
  ];
}

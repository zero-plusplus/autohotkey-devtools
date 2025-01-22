import { dedent } from '@zero-plusplus/utilities/src';
import * as constants_v1 from '../../../../src/autohotkeyl/constants';
import { RuleDescriptor, RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import * as common from '../../../common/declaration/assignment';
import type { ExpectedTestData } from '../../../types';

export function createAssignmentDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createAssignmentDeclarationExpectedData(scopeName, {
      modifiers: constants_v1.modifiers,
      operators: constants_v1.assignmentOperators,
    }),

    // lefthand
    [
      dedent`
        input := 1
        inputABC := 1
      `,
      [
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
        { text: 'inputABC', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
      ],
    ],
    [
      dedent`
        input["abc", 2] := 1
        inputABC["abc", 2] := 1
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
      ],
    ],
    [
      dedent`
        input.abc := 1
      `,
      [
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: '.', scopes: name(scopeName, RuleName.Dot) },
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
      ],
    ],
    [
      dedent`
        %input% := 1
        %input%abc := 1
      `,
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },

        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
      ],
    ],
    [
      dedent`
        input.abc[1].%abc% := 1
      `, [
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
      ],
    ],
  ];
}

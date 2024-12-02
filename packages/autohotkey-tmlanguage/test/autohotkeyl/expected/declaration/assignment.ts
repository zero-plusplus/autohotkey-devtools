import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createAssignmentDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        input := 1
        inputABC := 1

        input["abc", 2] := 1
        inputABC["abc", 2] := 1

        input.ABC := 1

        %input% := 1
        %input%ABC := 1
      `, [
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
        { text: 'inputABC', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },

        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringBegin) },
        { text: 'abc', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringEnd) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '2', scopes: name(scopeName, RuleName.Integer) },
        { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
        { text: 'inputABC', scopes: name(scopeName, RuleName.Variable) },
        { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringBegin) },
        { text: 'abc', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringEnd) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '2', scopes: name(scopeName, RuleName.Integer) },
        { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },

        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: '.', scopes: name(scopeName, RuleName.Dot) },
        { text: 'ABC', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },

        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: 'ABC', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
      ],
    ],

    [
      dedent`
        input.ABC[1].%ABC% := 1
      `, [
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: '.', scopes: name(scopeName, RuleName.Dot) },
        { text: 'ABC', scopes: name(scopeName, RuleName.Variable) },
        { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
        { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
        { text: '.', scopes: name(scopeName, RuleName.Dot) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'ABC', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
      ],
    ],
  ];
}

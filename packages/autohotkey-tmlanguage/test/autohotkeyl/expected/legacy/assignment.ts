import * as constants_v1 from '../../../../src/autohotkeyl/constants';
import { Repository, RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createLegacyAssignmentStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      'var = text', [
        { text: 'var', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.Variable) },
        { text: '=', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.Operator) },
        { text: 'text', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.UnquotedString) },
      ],
    ],
    [
      `var = ${constants_v1.unquoteEscapeSequences.join('')}`, [
        { text: 'var', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.Variable) },
        { text: '=', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.Operator) },
        ...constants_v1.unquoteEscapeSequences.map((escapeSequence) => {
          return { text: escapeSequence, scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.EscapeSequence) };
        }),
      ],
    ],
    [
      'var = a `; ; comment', [
        { text: 'var', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.Variable) },
        { text: '=', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.Operator) },
        { text: 'a ', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.UnquotedString) },
        { text: '`;', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.EscapeSequence) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
    [
      'var = %var2%', [
        { text: 'var', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.Variable) },
        { text: '=', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.Operator) },
        { text: '%', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.PercentBegin) },
        { text: 'var2', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.PercentEnd) },
      ],
    ],
    [
      'var = % abc', [
        { text: 'var', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.Variable) },
        { text: '=', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.Operator) },
        { text: '%', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.PercentExpressionBegin) },
        { text: 'abc', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.Variable) },
      ],
    ],
    [
      'var = % (foo,bar)', [
        { text: 'var', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.Variable) },
        { text: '=', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.Operator) },
        { text: '%', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.PercentExpressionBegin) },
        { text: '(', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.OpenParen) },
        { text: 'foo', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.Comma) },
        { text: 'bar', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.Variable) },
        { text: ')', scopes: name(scopeName, Repository.LegacyAssignmentDeclaration, RuleName.CloseParen) },
      ],
    ],
  ];
}

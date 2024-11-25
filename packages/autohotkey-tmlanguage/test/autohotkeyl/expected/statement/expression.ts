import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createExpressionStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // #region variable
    [ 'var', [ { text: 'var', scopes: name(scopeName, RuleName.Variable) } ] ],
    [ '$#@_var123', [ { text: '$#@_var123', scopes: name(scopeName, RuleName.Variable) } ] ],
    // #endregion variable

    // #region builtin-variable
    [
      '%abc%', [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
    ],
    [
      '%A_ScriptDir%',
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'A_ScriptDir', scopes: name(scopeName, RuleName.BuiltInVariable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
    ],
    // #endregion builtin-variable

    // #region dereference
    [
      '%abc%', [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
    ],
    [
      '%A_ScriptDir%',
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'A_ScriptDir', scopes: name(scopeName, RuleName.BuiltInVariable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
    ],
    [
      '%%', [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin, StyleName.Invalid) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd, StyleName.Invalid) },
      ],
    ],
    [
      '%a', [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
      ],
    ],
    [
      '%a %', [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
    ],
    [
      '%a b c %', [
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: 'c', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
      ],
    ],
    // #endregion dereference

    // #region object
    [
      'abc := { key: 1, key2: { %key3%: 2 } }', [
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: 'key', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'key2', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'key3', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '2', scopes: name(scopeName, RuleName.Integer) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
      ],
    ],
    // #endregion object

    // #region array
    [
      dedent`abc := [ 1, [ 2 ], 3 ]`, [
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
        { text: '2', scopes: name(scopeName, RuleName.Integer) },
        { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '3', scopes: name(scopeName, RuleName.Integer) },
        { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
      ],
    ],
    [
      dedent`abc := [ 1
                    , [ 2 ]
                    , 3 ]`, [
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
        { text: '2', scopes: name(scopeName, RuleName.Integer) },
        { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '3', scopes: name(scopeName, RuleName.Integer) },
        { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
      ],
    ],
    // #endregion array
  ];
}

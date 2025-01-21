import { dedent, repeatArray } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createFunctionExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        XXX(() {
        })
        XXX(()
        {
        })

        XXX(YYY() {
        })
        XXX(YYY()
        {
        })
      `,
      [
        ...repeatArray(2, [
          { text: 'XXX', scopes: name(scopeName, RuleName.FunctionName) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        ]),

        ...repeatArray(2, [
          { text: 'XXX', scopes: name(scopeName, RuleName.FunctionName) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: 'YYY', scopes: name(scopeName, RuleName.FunctionName) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        ]),
      ],
    ],

    // The get/set keywords are valid in function definition expression intentionally, to avoid limitations on the TMLanguage
    [
      dedent`
        var := (()
        {
          get {
          }
          set {
          }
        })()

        class {
          field := (()
          {
            get {
            }
            set {
            }
          })()

          property
          {
            get {
            }
            set {
            }
          }
        }
      `,
      [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },

        { text: 'get', scopes: name(scopeName, RuleName.GetSetKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'set', scopes: name(scopeName, RuleName.GetSetKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
        { text: 'field', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },

        { text: 'get', scopes: name(scopeName, RuleName.GetSetKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'set', scopes: name(scopeName, RuleName.GetSetKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: 'property', scopes: name(scopeName, RuleName.Variable) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },

        { text: 'get', scopes: name(scopeName, RuleName.GetSetKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'set', scopes: name(scopeName, RuleName.GetSetKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
      ],
    ],
  ];
}

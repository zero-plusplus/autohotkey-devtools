import { dedent, repeatArray } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createExportDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        export x
        export default x
        export xxx() => yyy

        export yyy() {
        }
        export class a {
        }
        export class a extends b.c {
        }
        export yyy()
        {
        }
        export class a
        {
        }
        export class a extends b.c
        {
        }

        export default yyy() {
        }
        export default class a {
        }
        export default class a extends b.c {
        }
        export default yyy()
        {
        }
        export default class a
        {
        }
        export default class a extends b.c
        {
        }

      `, [
        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },

        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'default', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },

        { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
        { text: 'xxx', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '=>', scopes: name(scopeName, RuleName.Operator) },
        { text: 'yyy', scopes: name(scopeName, RuleName.Variable) },

        ...repeatArray(2, [
          { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: 'yyy', scopes: name(scopeName, RuleName.FunctionName) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

          { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
          { text: 'a', scopes: name(scopeName, RuleName.ClassName) },
          { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },

          { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
          { text: 'a', scopes: name(scopeName, RuleName.ClassName) },
          { text: 'extends', scopes: name(scopeName, RuleName.ExtendsKeyword) },
          { text: 'b', scopes: name(scopeName, RuleName.ClassName) },
          { text: '.', scopes: name(scopeName, RuleName.Dot) },
          { text: 'c', scopes: name(scopeName, RuleName.ClassName) },
          { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        ]),

        ...repeatArray(2, [
          { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: 'default', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: 'yyy', scopes: name(scopeName, RuleName.FunctionName) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

          { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: 'default', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
          { text: 'a', scopes: name(scopeName, RuleName.ClassName) },
          { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },

          { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: 'default', scopes: name(scopeName, RuleName.MetaKeyword) },
          { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
          { text: 'a', scopes: name(scopeName, RuleName.ClassName) },
          { text: 'extends', scopes: name(scopeName, RuleName.ExtendsKeyword) },
          { text: 'b', scopes: name(scopeName, RuleName.ClassName) },
          { text: '.', scopes: name(scopeName, RuleName.Dot) },
          { text: 'c', scopes: name(scopeName, RuleName.ClassName) },
          { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
          { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        ]),
      ],
    ],
  ];
}

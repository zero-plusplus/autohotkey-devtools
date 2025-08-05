import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/ControlGet.htm
export function createControlGetExpectedDataList(scopeName: ScopeName, commandName = 'ControlGet'): ExpectedTestData[] {
  return [

    // Parameter 1: Control
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${commandName} output          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName} f()          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: 'f', scopes: name(scopeName, RuleName.Variable) },
            { text: '()', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName}, %output%           ; comment
            ${commandName}, %ou%t%put%         ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'ou', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 't', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: 'put', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName} % output          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: '% output', scopes: name(scopeName, RuleName.PercentExpressionBegin, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),
  ];
}

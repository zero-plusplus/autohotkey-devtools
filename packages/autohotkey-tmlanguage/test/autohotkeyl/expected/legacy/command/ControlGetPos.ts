import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleDescriptor, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/ControlGetPos.htm
export function createControlGetPosExpectedDataList(scopeName: ScopeName, commandName = 'ControlGetPos'): ExpectedTestData[] {
  return [
    // Parameter 1: OutX
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
            { text: '()', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
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

    // Parameter 2: OutY
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${commandName},, output          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName},, f()          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'f', scopes: name(scopeName, RuleName.Variable) },
            { text: '()', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName},, %output%           ; comment
            ${commandName},, %ou%t%put%         ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
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
            ${commandName},, % output          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '% output', scopes: name(scopeName, RuleName.PercentExpressionBegin, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // Parameter 3: OutWidth
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${commandName},,, output          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName},,, f()          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'f', scopes: name(scopeName, RuleName.Variable) },
            { text: '()', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName},,, %output%           ; comment
            ${commandName},,, %ou%t%put%         ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
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
            ${commandName},,, % output          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '% output', scopes: name(scopeName, RuleName.PercentExpressionBegin, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // Parameter 4: OutHeight
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${commandName},,,, output          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName},,,, f()          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'f', scopes: name(scopeName, RuleName.Variable) },
            { text: '()', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName},,,, %output%           ; comment
            ${commandName},,,, %ou%t%put%         ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
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
            ${commandName},,,, % output          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '% output', scopes: name(scopeName, RuleName.PercentExpressionBegin, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // Parameter 5: Control
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${commandName},,,,, ahk_id %hwnd%          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'ahk_id', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'hwnd', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName},,,,, i)^[^a](?C123:abc)regexp*          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'i)', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpOption) },
            { text: '^', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpAnchor) },
            { text: '[^', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.Begin) },
            { text: 'a', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet) },
            { text: ']', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.End) },
            { text: '(?C123', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
            { text: ':', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup) },
            { text: 'abc', scopes: name(scopeName, RuleName.RegExpString, RuleName.FunctionName) },
            { text: ')', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.End) },
            { text: 'regexp', scopes: name(scopeName, RuleName.RegExpString) },
            { text: '*', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpQuantifier) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName},,,,, % var                 ; comment
            ${commandName},,,,, %var%                 ; comment
            ${commandName},,,,, %var%var%var%         ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // Parameter 6: WinTitle
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${commandName},,,,,, ahk_id %hwnd%          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'ahk_id', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'hwnd', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName},,,,,, % var                 ; comment
            ${commandName},,,,,, %var%                 ; comment
            ${commandName},,,,,, %var%var%var%         ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // Parameter 7: WinText
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${commandName},,,,,,, unquoted,          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName},,,,,,, % var                 ; comment
            ${commandName},,,,,,, %var%                 ; comment
            ${commandName},,,,,,, %var%var%var%         ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // Parameter 8: ExcludeTitle
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${commandName},,,,,,,, ahk_id %hwnd%          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'ahk_id', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'hwnd', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName},,,,,,,, % var                 ; comment
            ${commandName},,,,,,,, %var%                 ; comment
            ${commandName},,,,,,,, %var%var%var%         ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // Parameter 9: ExcludeText
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${commandName},,,,,,,,, unquoted,          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted,', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName},,,,,,,,, % var                 ; comment
            ${commandName},,,,,,,,, %var%                 ; comment
            ${commandName},,,,,,,,, %var%var%var%         ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),
  ];
}

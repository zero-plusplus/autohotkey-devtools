import { dedent } from '@zero-plusplus/utilities/src';
import * as constants_common from '../../../src/common/constants';
import {
  name, RuleDescriptor, RuleName, StyleName, TokenType,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData, ParsedResult } from '../../types';

interface Placeholder {
  quote: string;
  escapedQuoted: string;
  escapeSequences: readonly string[];
  regexOptions: readonly string[];
}
export function createRegExpExpectedData(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  const q = placeholder.quote;
  return [
    // #region shothund regexp match
    // raw text
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            var ~= ${q}${q}           ; comment
            var ~= ${q}text${q}       ; comment
          `,
          [
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // options
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            var ~= ${q}${placeholder.regexOptions.join('')})text${q}  ; comment
            var ~= ${q}(*UCP)text${q}                                 ; comment
            var ~= ${q}i)(*UCP)text${q}                               ; comment
          `,
          [
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: `${placeholder.regexOptions.join('')})`, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpOption) },
            { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: '(*UCP)', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpOption) },
            { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: 'i)(*UCP)', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpOption) },
            { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // callout
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            var ~= ${q}(?C123)${q}                  ; comment
            var ~= ${q}(?C123:func)${q}             ; comment
          `,
          [
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: '(?C123', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
            { text: ')', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.End) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: '(?C123', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
            { text: ':', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup) },
            { text: 'func', scopes: name(scopeName, RuleName.RegExpString, RuleName.FunctionName) },
            { text: ')', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.End) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // sub expression
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            var ~= ${q}(text)${q}           ; comment
            var ~= ${q}(?:text)${q}         ; comment
            var ~= ${q}(?=text)${q}         ; comment
            var ~= ${q}(?!text)${q}         ; comment
            var ~= ${q}(?<=text)${q}        ; comment
            var ~= ${q}(?<!text)${q}        ; comment
          `,
          [
            ...[ '(', '(?:', '(?=', '(?!', '(?<=', '(?<!' ].flatMap((groupStart): ParsedResult[] => {
              return [
                { text: 'var', scopes: name(scopeName, RuleName.Variable) },
                { text: '~=', scopes: name(scopeName, RuleName.Operator) },
                { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
                { text: groupStart, scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.Begin) },
                { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
                { text: ')', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.End) },
                { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ];
            }),
          ],
        ],
        [
          dedent`
            var ~= ${q}(?<name>text)${q}      ; comment
          `,
          [
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: '(?<', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.Begin) },
            { text: 'name', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleName.Variable, RuleDescriptor.Begin) },
            { text: '>', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.Begin) },
            { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
            { text: ')', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.End) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            var ~= ${q}(?im:text)${q}       ; comment
            var ~= ${q}(?-im:text)${q}      ; comment
          `,
          [
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: '(?', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.Begin) },
            { text: 'i', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleName.RegExpOption, RuleDescriptor.Begin) },
            { text: 'm', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleName.RegExpOption, RuleDescriptor.Begin) },
            { text: ':', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.Begin) },
            { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
            { text: ')', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.End) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: '(?', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.Begin) },
            { text: '-', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleName.RegExpOption, RuleDescriptor.Begin) },
            { text: 'i', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleName.RegExpOption, RuleDescriptor.Begin) },
            { text: 'm', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleName.RegExpOption, RuleDescriptor.Begin) },
            { text: ':', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.Begin) },
            { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
            { text: ')', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.End) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // literal sequence
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            var ~= ${q}\\Q(text)\\E${q}
          `,
          [
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: '\\Q', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
            { text: '(text)', scopes: name(scopeName, RuleName.RegExpString) },
            { text: '\\E', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.End) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
          ],
        ],
      ];
    })(),

    // character classes
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            var ~= ${q}[abc]${q}        ; comment
            var ~= ${q}[^abc]${q}       ; comment
            var ~= ${q}[\\]]${q}        ; comment
          `,
          [
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: '[', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.Begin) },
            { text: 'abc', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet) },
            { text: ']', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.End) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: '[^', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.Begin) },
            { text: 'abc', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet) },
            { text: ']', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.End) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: '[', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.Begin) },
            { text: '\\]', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, StyleName.Escape) },
            { text: ']', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.End) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        ...[ ...constants_common.pcreUnicodePropertyCodes, ...constants_common.pcreUnicodePropertyScripts ].map((code): ExpectedTestData => {
          return [
            dedent`
              var ~= ${q}\\p{${code}}${q}     ; comment
            `,
            [
              { text: 'var', scopes: name(scopeName, RuleName.Variable) },
              { text: '~=', scopes: name(scopeName, RuleName.Operator) },
              { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
              { text: `\\p{`, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass, RuleDescriptor.Begin) },
              { text: code, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass, StyleName.Strong) },
              { text: `}`, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass, RuleDescriptor.End) },
              { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ];
        }),
        ...constants_common.pcreUnicodePropertyCodes.filter((code) => code.length === 1).map((letterCode): ExpectedTestData => {
          return [
            dedent`
              var ~= ${q}\\p${letterCode}${q}       ; comment
            `,
            [
              { text: 'var', scopes: name(scopeName, RuleName.Variable) },
              { text: '~=', scopes: name(scopeName, RuleName.Operator) },
              { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
              { text: `\\p${letterCode}`, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass) },
              { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ];
        }),
      ];
    })(),

    // anchor
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            var ~= ${q}^$${q}         ; comment
          `,
          [
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: '^', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpAnchor) },
            { text: '$', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpAnchor) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // quantifier
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            var ~= ${q}.?${q}         ; comment
            var ~= ${q}.*${q}         ; comment
            var ~= ${q}.+${q}         ; comment
          `,
          [
            ...[ '?', '*', '+' ].flatMap((quantifier): ParsedResult[] => {
              return [
                { text: 'var', scopes: name(scopeName, RuleName.Variable) },
                { text: '~=', scopes: name(scopeName, RuleName.Operator) },
                { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
                { text: '.', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass) },
                { text: quantifier, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpQuantifier) },
                { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ];
            }),
          ],
        ],
        [
          dedent`
            var ~= ${q}.{1}${q}          ; comment
            var ~= ${q}.{1,}${q}         ; comment
            var ~= ${q}.{1,2}${q}        ; comment
            var ~= ${q}.{,}${q}          ; comment
            var ~= ${q}.{,2}${q}         ; comment
          `,
          [
            ...[ '{1}', '{1,}', '{1,2}', '{,}', '{,2}' ].flatMap((quantifier): ParsedResult[] => {
              return [
                { text: 'var', scopes: name(scopeName, RuleName.Variable) },
                { text: '~=', scopes: name(scopeName, RuleName.Operator) },
                { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
                { text: '.', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass) },
                { text: quantifier, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpQuantifier) },
                { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ];
            }),
          ],
        ],
      ];
    })(),

    // escape sequence
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            var ~= ${q}\\.[\\.]${q}           ; comment
            var ~= ${q}\\*[\\*]${q}           ; comment
            var ~= ${q}\\?[\\?]${q}           ; comment
            var ~= ${q}\\+[\\+]${q}           ; comment
            var ~= ${q}\\[[\\[]${q}           ; comment
            var ~= ${q}\\{[\\{]${q}           ; comment
            var ~= ${q}\\|[\\|]${q}           ; comment
            var ~= ${q}\\([\\(]${q}           ; comment
            var ~= ${q}\\)[\\)]${q}           ; comment
            var ~= ${q}\\^[\\^]${q}           ; comment
            var ~= ${q}\\$[\\$]${q}           ; comment
            var ~= ${q}\\\\[\\\\]${q}         ; comment
          `,
          [
            ...constants_common.regexpEscapeSequences.flatMap((escapeSequence): ParsedResult[] => {
              return [
                { text: 'var', scopes: name(scopeName, RuleName.Variable) },
                { text: '~=', scopes: name(scopeName, RuleName.Operator) },
                { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
                { text: escapeSequence, scopes: name(scopeName, RuleName.RegExpString, StyleName.Escape) },
                { text: `[`, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.Begin) },
                { text: escapeSequence, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, StyleName.Escape) },
                { text: `]`, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.End) },
                { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ];
            }),
          ],
        ],
        ...placeholder.escapeSequences.map((escapeSequence): ExpectedTestData => {
          return [
            dedent`
              var ~= ${q}${escapeSequence}${q}      ; comment
            `,
            [
              { text: 'var', scopes: name(scopeName, RuleName.Variable) },
              { text: '~=', scopes: name(scopeName, RuleName.Operator) },
              { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
              { text: escapeSequence, scopes: name(scopeName, RuleName.RegExpString, StyleName.Escape) },
              { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ];
        }),
      ];
    })(),
    // #endregion shothund regexp match

    // #region string as regexp
    [
      dedent`
        ${q})text${q}                                               ; comment
        ${q}${placeholder.regexOptions.join('')})text${q}           ; comment
      `,
      [
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: ')', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpOption) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: `${placeholder.regexOptions.join('')})`, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpOption) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    // #endregion string as regexp
  ];
}

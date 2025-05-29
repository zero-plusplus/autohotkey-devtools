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
    [
      dedent`
        var ~= ${q}${q}
        var ~= ${q}text${q}
        var ~= ${q}${placeholder.regexOptions.join('')})text${q}
        var ~= ${q}(*UCP)text${q}
        var ~= ${q}i)(*UCP)text${q}
      `, [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },

        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },

        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: `${placeholder.regexOptions.join('')})`, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpOption) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },

        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '(*UCP)', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpOption) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },

        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: 'i)(*UCP)', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpOption) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
      ],
    ],
    // callout
    [
      dedent`
        var ~= ${q}(?C123)${q}
        var ~= ${q}(?C123:func)${q}
      `, [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '(?C123', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
        { text: ')', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.End) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },

        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '(?C123', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
        { text: ':', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup) },
        { text: 'func', scopes: name(scopeName, RuleName.RegExpString, RuleName.FunctionName) },
        { text: ')', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.End) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
      ],
    ],
    // #region sub expression
    [
      dedent`
        var ~= ${q}(text)${q}
        var ~= ${q}(?:text)${q}
        var ~= ${q}(?=text)${q}
        var ~= ${q}(?!text)${q}
        var ~= ${q}(?<=text)${q}
        var ~= ${q}(?<!text)${q}
      `, [
        ...[ '(', '(?:', '(?=', '(?!', '(?<=', '(?<!' ].flatMap((groupStart): ParsedResult[] => {
          return [
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: groupStart, scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.Begin) },
            { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
            { text: ')', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.End) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
          ];
        }),
      ],
    ],
    [
      dedent`
        var ~= ${q}(?<name>text)${q}
      `, [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '(?<', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.Begin) },
        { text: 'name', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleName.Variable, RuleDescriptor.Begin) },
        { text: '>', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.Begin) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: ')', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.End) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
      ],
    ],
    [
      dedent`
        var ~= ${q}(?im:text)${q}
        var ~= ${q}(?-im:text)${q}
      `, [
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
      ],
    ],
    // #endregion sub expression

    // #region literal sequence
    [
      dedent`
        var ~= ${q}\\Q(text)\\E${q}
      `, [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '\\Q', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
        { text: '(text)', scopes: name(scopeName, RuleName.RegExpString) },
        { text: '\\E', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.End) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
      ],
    ],
    // #endregion literal sequence

    // #region character classes
    [
      dedent`
        var ~= ${q}[abc]${q}
        var ~= ${q}[^abc]${q}
        var ~= ${q}[\\]]${q}
      `, [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '[', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.Begin) },
        { text: 'abc', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet) },
        { text: ']', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.End) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },

        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '[^', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.Begin) },
        { text: 'abc', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet) },
        { text: ']', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.End) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },

        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '[', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.Begin) },
        { text: '\\]', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, StyleName.Escape) },
        { text: ']', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.End) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
      ],
    ],
    ...[ ...constants_common.pcreUnicodePropertyCodes, ...constants_common.pcreUnicodePropertyScripts ].map((code): ExpectedTestData => {
      return [
        dedent`
          var ~= ${q}\\p{${code}}${q}
        `, [
          { text: 'var', scopes: name(scopeName, RuleName.Variable) },
          { text: '~=', scopes: name(scopeName, RuleName.Operator) },
          { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
          { text: `\\p{`, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass, RuleDescriptor.Begin) },
          { text: code, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass, StyleName.Strong) },
          { text: `}`, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass, RuleDescriptor.End) },
          { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
        ],
      ];
    }),
    ...constants_common.pcreUnicodePropertyCodes.filter((code) => code.length === 1).map((letterCode): ExpectedTestData => {
      return [
        dedent`
          var ~= ${q}\\p${letterCode}${q}
        `, [
          { text: 'var', scopes: name(scopeName, RuleName.Variable) },
          { text: '~=', scopes: name(scopeName, RuleName.Operator) },
          { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
          { text: `\\p${letterCode}`, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass) },
          { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
        ],
      ];
    }),
    // #endregion character classes

    // #region anchor
    [
      dedent`
        var ~= ${q}^$${q}
      `, [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '^', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpAnchor) },
        { text: '$', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpAnchor) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
      ],
    ],
    // #endregion anchor

    // #region quantifier
    [
      dedent`
        var ~= ${q}.?${q}
        var ~= ${q}.*${q}
        var ~= ${q}.+${q}
      `, [
        ...[ '?', '*', '+' ].flatMap((quantifier): ParsedResult[] => {
          return [
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: '.', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass) },
            { text: quantifier, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpQuantifier) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
          ];
        }),
      ],
    ],
    [
      dedent`
        var ~= ${q}.{1}${q}
        var ~= ${q}.{1,}${q}
        var ~= ${q}.{1,2}${q}
        var ~= ${q}.{,}${q}
        var ~= ${q}.{,2}${q}
      `, [
        ...[ '{1}', '{1,}', '{1,2}', '{,}', '{,2}' ].flatMap((quantifier): ParsedResult[] => {
          return [
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: '.', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass) },
            { text: quantifier, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpQuantifier) },
            { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
          ];
        }),
      ],
    ],
    // #endregion quantifier

    // #region escape sequence
    [
      dedent`
        var ~= ${q}\\.[\\.]${q}
        var ~= ${q}\\*[\\*]${q}
        var ~= ${q}\\?[\\?]${q}
        var ~= ${q}\\+[\\+]${q}
        var ~= ${q}\\[[\\[]${q}
        var ~= ${q}\\{[\\{]${q}
        var ~= ${q}\\|[\\|]${q}
        var ~= ${q}\\([\\(]${q}
        var ~= ${q}\\)[\\)]${q}
        var ~= ${q}\\^[\\^]${q}
        var ~= ${q}\\$[\\$]${q}
        var ~= ${q}\\\\[\\\\]${q}
      `, [
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
          ];
        }),
      ],
    ],
    ...placeholder.escapeSequences.map((escapeSequence): ExpectedTestData => {
      return [
        `var ~= ${q}${escapeSequence}${q}`,
        [
          { text: 'var', scopes: name(scopeName, RuleName.Variable) },
          { text: '~=', scopes: name(scopeName, RuleName.Operator) },
          { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
          { text: escapeSequence, scopes: name(scopeName, RuleName.RegExpString, StyleName.Escape) },
          { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
        ],
      ];
    }),
    // #endregion escape sequence
    // #endregion shothund regexp match

    // #region string as regexp
    [
      dedent`
        ${q})text${q}
        ${q}${placeholder.regexOptions.join('')})text${q}
      `, [
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: ')', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpOption) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },

        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: `${placeholder.regexOptions.join('')})`, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpOption) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: q, scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
      ],
    ],
    // #endregion string as regexp
  ];
}

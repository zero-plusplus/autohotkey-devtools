import { dedent } from '@zero-plusplus/utilities/src';
import * as constants_v1 from '../../../../src/autohotkeyl/constants';
import { RuleDescriptor, RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData, ParsedResult } from '../../../types';

export function createRegExpExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // #region shothund regexp match
    [
      dedent`
        var ~= ""
        var ~= "text"
        var ~= "im)text"
        var ~= "(*UCP)text"
        var ~= "i)(*UCP)text"
      `, [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },

        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },

        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: 'im)', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpOption) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },

        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '(*UCP)', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpOption) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },

        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: 'i)(*UCP)', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpOption) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
      ],
    ],
    // callout
    [
      dedent`
        var ~= "(?C123)"
        var ~= "(?C123:func)"
      `, [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '(?C123', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
        { text: ')', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.End) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },

        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '(?C123', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
        { text: ':', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup) },
        { text: 'func', scopes: name(scopeName, RuleName.RegExpString, RuleName.FunctionName) },
        { text: ')', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.End) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
      ],
    ],
    // #region sub expression
    [
      dedent`
        var ~= "(text)"
        var ~= "(?:text)"
        var ~= "(?=text)"
        var ~= "(?!text)"
        var ~= "(?<=text)"
        var ~= "(?<!text)"
      `, [
        ...[ '(', '(?:', '(?=', '(?!', '(?<=', '(?<!' ].flatMap((groupStart): ParsedResult[] => {
          return [
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: groupStart, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
            { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
            { text: ')', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.End) },
            { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
          ];
        }),
      ],
    ],
    [
      dedent`
        var ~= "(?<name>text)"
      `, [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '(?<', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
        { text: 'name', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleName.Variable, RuleDescriptor.Begin) },
        { text: '>', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: ')', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.End) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
      ],
    ],
    [
      dedent`
        var ~= "(?im:text)"
        var ~= "(?-im:text)"
      `, [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '(?', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
        { text: 'i', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleName.RegExpOption, RuleDescriptor.Begin) },
        { text: 'm', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleName.RegExpOption, RuleDescriptor.Begin) },
        { text: ':', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: ')', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.End) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },

        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '(?', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
        { text: '-', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleName.RegExpOption, RuleDescriptor.Begin) },
        { text: 'i', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleName.RegExpOption, RuleDescriptor.Begin) },
        { text: 'm', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleName.RegExpOption, RuleDescriptor.Begin) },
        { text: ':', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: ')', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.End) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
      ],
    ],
    // #endregion sub expression

    // #region literal sequence
    [
      dedent`
        var ~= "\\Q(text)\\E"
      `, [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '\\Q', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
        { text: '(text)', scopes: name(scopeName, RuleName.RegExpString) },
        { text: '\\E', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.End) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
      ],
    ],
    // #endregion literal sequence

    // #region character classes
    [
      dedent`
        var ~= "[abc]"
        var ~= "[^abc]"
        var ~= "[\\]]"
      `, [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '[', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.Begin) },
        { text: 'abc', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet) },
        { text: ']', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.End) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },

        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '[^', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.Begin) },
        { text: 'abc', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet) },
        { text: ']', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.End) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },

        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '[', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.Begin) },
        { text: '\\]', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, StyleName.Escape) },
        { text: ']', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.End) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
      ],
    ],
    ...[ ...constants_v1.pcreUnicodePropertyCodes, ...constants_v1.pcreUnicodePropertyScripts ].map((code): ExpectedTestData => {
      return [
        dedent`
          var ~= "\\p{${code}}"
        `, [
          { text: 'var', scopes: name(scopeName, RuleName.Variable) },
          { text: '~=', scopes: name(scopeName, RuleName.Operator) },
          { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
          { text: `\\p{`, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass, RuleDescriptor.Begin) },
          { text: code, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass, StyleName.Strong) },
          { text: `}`, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass, RuleDescriptor.End) },
          { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
        ],
      ];
    }),
    ...constants_v1.pcreUnicodePropertyCodes.filter((code) => code.length === 1).map((letterCode): ExpectedTestData => {
      return [
        dedent`
          var ~= "\\p${letterCode}"
        `, [
          { text: 'var', scopes: name(scopeName, RuleName.Variable) },
          { text: '~=', scopes: name(scopeName, RuleName.Operator) },
          { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
          { text: `\\p${letterCode}`, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass) },
          { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
        ],
      ];
    }),
    // #endregion character classes

    // #region anchor
    [
      dedent`
        var ~= "^$"
      `, [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: '^', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpAnchor) },
        { text: '$', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpAnchor) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
      ],
    ],
    // #endregion anchor

    // #region quantifier
    [
      dedent`
        var ~= ".?"
        var ~= ".*"
        var ~= ".+"
      `, [
        ...[ '?', '*', '+' ].flatMap((quantifier): ParsedResult[] => {
          return [
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: '.', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass) },
            { text: quantifier, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpQuantifier) },
            { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
          ];
        }),
      ],
    ],
    [
      dedent`
        var ~= ".{1}"
        var ~= ".{1,}"
        var ~= ".{1,2}"
        var ~= ".{,}"
        var ~= ".{,2}"
      `, [
        ...[ '{1}', '{1,}', '{1,2}', '{,}', '{,2}' ].flatMap((quantifier): ParsedResult[] => {
          return [
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: '.', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass) },
            { text: quantifier, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpQuantifier) },
            { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
          ];
        }),
      ],
    ],
    // #endregion quantifier

    // #region escape sequence
    [
      dedent`
        var ~= "\\.[\\.]"
        var ~= "\\*[\\*]"
        var ~= "\\?[\\?]"
        var ~= "\\+[\\+]"
        var ~= "\\[[\\[]"
        var ~= "\\{[\\{]"
        var ~= "\\|[\\|]"
        var ~= "\\([\\(]"
        var ~= "\\)[\\)]"
        var ~= "\\^[\\^]"
        var ~= "\\$[\\$]"
        var ~= "\\\\[\\\\]"
      `, [
        ...constants_v1.regexpEscapeSequences.flatMap((escapeSequence): ParsedResult[] => {
          return [
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '~=', scopes: name(scopeName, RuleName.Operator) },
            { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
            { text: escapeSequence, scopes: name(scopeName, RuleName.RegExpString, StyleName.Escape) },
            { text: `[`, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.Begin) },
            { text: escapeSequence, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, StyleName.Escape) },
            { text: `]`, scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.End) },
            { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
          ];
        }),
      ],
    ],
    [
      `var ~= "${constants_v1.doubleQuoteEscapeSequences.join('')}"`, [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '~=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        ...constants_v1.doubleQuoteEscapeSequences.map((escapeSequence) => {
          return { text: escapeSequence, scopes: name(scopeName, RuleName.RegExpString, StyleName.Escape) };
        }),
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
      ],
    ],
    // #endregion escape sequence
    // #endregion shothund regexp match

    // #region string as regexp
    [
      dedent`
        "\`)text"
        ")text"
        "im)text"
      `, [
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringBegin) },
        { text: '`)', scopes: name(scopeName, RuleName.DoubleString, StyleName.Escape) },
        { text: 'text', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringEnd) },

        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: ')', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpOption) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },

        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.Begin) },
        { text: 'im)', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpOption) },
        { text: 'text', scopes: name(scopeName, RuleName.RegExpString) },
        { text: '"', scopes: name(scopeName, RuleName.RegExpString, RuleDescriptor.End) },
      ],
    ],
    // #endregion string as regexp
  ];
}

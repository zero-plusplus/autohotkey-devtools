import { dedent, repeatArray } from '@zero-plusplus/utilities/src';
import {
  name, RuleDescriptor, RuleName, StyleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

interface Placeholder {
  ruleName: RuleName;
  quote: string;
  escapeSequences: readonly string[];
}
export function createStringLiteralExpectedData(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  const q = placeholder.quote;
  return [
    [
      dedent`
        ${q}${q}
        ${q}${q}, ${q}${q}
        ${q}string${q}
      `, [
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },

        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },

        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
        { text: 'string', scopes: name(scopeName, placeholder.ruleName) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
      ],
    ],

    // escape sequences
    ...placeholder.escapeSequences.map((escapeSequence): ExpectedTestData => {
      return [
        `${q}${escapeSequence}${q}`, [
          { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
          { text: escapeSequence, scopes: name(scopeName, placeholder.ruleName, StyleName.Escape) },
          { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
        ],
      ];
    }),
    ...placeholder.escapeSequences.map((escapeSequence): ExpectedTestData => {
      const count = 5;
      return [
        `${q}${escapeSequence.repeat(count)}${q}`, [
          { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
          ...repeatArray(count, [ { text: escapeSequence, scopes: name(scopeName, placeholder.ruleName, StyleName.Escape) } ]),
          { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
        ],
      ];
    }),

    // String not treated as a regexp
    [
      dedent`
        ${q}i)${q}
        ${q}i\`)text${q}
      `, [
        // If only the regexp options, it is highlighted as a string
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
        { text: 'i)', scopes: name(scopeName, placeholder.ruleName) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },

        // If the closing character of the regexp options is escaped, it is highlighted as a string
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
        { text: 'i', scopes: name(scopeName, placeholder.ruleName) },
        { text: '`)', scopes: name(scopeName, placeholder.ruleName, StyleName.Escape) },
        { text: 'text', scopes: name(scopeName, placeholder.ruleName) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
      ],
    ],

    // continuation section
    [
      dedent`
        abc := ${q}
        (LTrim
          1-line
          2-line
        )${q}
      `, [
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
        { text: '(', scopes: name(scopeName, placeholder.ruleName) },
        { text: 'LTrim', scopes: name(scopeName, placeholder.ruleName, RuleName.ContinuationOption, StyleName.Strong) },
        { text: '  1-line', scopes: name(scopeName, placeholder.ruleName) },
        { text: '  2-line', scopes: name(scopeName, placeholder.ruleName) },
        { text: `)${q}`, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
      ],
    ],

    // Do not conflict with labels
    [
      dedent`
        ${q}:${q}
        ${q}::${q}
      `, [
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
        { text: ':', scopes: name(scopeName, placeholder.ruleName) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },

        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
        { text: '::', scopes: name(scopeName, placeholder.ruleName) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
      ],
    ],
    // Multiple occurrences of a string on a single line
    [
      dedent`
        (var ? ${q}  text  ${q} : ${q}  text  ${q})
      `, [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '?', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
        { text: '  text  ', scopes: name(scopeName, placeholder.ruleName) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
        { text: ':', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
        { text: '  text  ', scopes: name(scopeName, placeholder.ruleName) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],
    // Fix: Beginning with a parenthesis opening is misidentified as a starting position and highlighted as an option
    [
      dedent`
        var := ${q}
        (LTrim
          (text
          (text)
        )${q}
      `, [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
        { text: '(', scopes: name(scopeName, placeholder.ruleName) },
        { text: 'LTrim', scopes: name(scopeName, placeholder.ruleName, RuleName.ContinuationOption, StyleName.Strong) },
        { text: '  (text', scopes: name(scopeName, placeholder.ruleName) },
        { text: '  (text)', scopes: name(scopeName, placeholder.ruleName) },
        { text: `)${q}`, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
      ],
    ],
  ];
}

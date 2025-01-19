import { dedent } from '@zero-plusplus/utilities/src';
import { RuleDescriptor, RuleName, StyleName } from '../../../src/constants';
import type { ScopeName } from '../../../src/types';
import { name } from '../../../src/utils';
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
  ];
}

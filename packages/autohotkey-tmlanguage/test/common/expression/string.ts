import { dedent } from '@zero-plusplus/utilities/src';
import { RuleDescriptor, RuleName, StyleName } from '../../../src/constants';
import type { ScopeName } from '../../../src/types';
import { name } from '../../../src/utils';
import type { ExpectedTestData } from '../../types';

interface Placeholder {
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
        { text: q, scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: q, scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

        { text: q, scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: q, scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: q, scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: q, scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

        { text: q, scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'string', scopes: name(scopeName, RuleName.DoubleString) },
        { text: q, scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
      ],
    ],

    // escape sequences
    ...placeholder.escapeSequences.map((escapeSequence): ExpectedTestData => {
      return [
        `${q}${escapeSequence}${q}`, [
          { text: q, scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
          { text: escapeSequence, scopes: name(scopeName, RuleName.DoubleString, StyleName.Escape) },
          { text: q, scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        ],
      ];
    }),
  ];
}

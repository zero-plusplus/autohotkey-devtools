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
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${q}${q}                ; comment
            ${q}${q}, ${q}${q}      ; comment
            ${q}string${q}          ; comment
          `,
          [
            { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
            { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
            { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
            { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
            { text: 'string', scopes: name(scopeName, placeholder.ruleName) },
            { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // escape sequences
    ...((): ExpectedTestData[] => {
      return [
        ...placeholder.escapeSequences.map((escapeSequence): ExpectedTestData => {
          return [
            dedent`
              ${q}${escapeSequence}${q}     ; comment
            `,
            [
              { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
              { text: escapeSequence, scopes: name(scopeName, placeholder.ruleName, StyleName.Escape) },
              { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ];
        }),
        ...placeholder.escapeSequences.map((escapeSequence): ExpectedTestData => {
          const count = 5;

          return [
            dedent`
              ${q}${escapeSequence.repeat(count)}${q}     ; comment
            `,
            [
              { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
              ...repeatArray(count, [ { text: escapeSequence, scopes: name(scopeName, placeholder.ruleName, StyleName.Escape) } ]),
              { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ];
        }),
      ];
    })(),

    // String not treated as a regexp
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${q}i)${q}              ; comment
            ${q}i\`)text${q}        ; comment
          `,
          [
            // If only the regexp options, it is highlighted as a string
            { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
            { text: 'i)', scopes: name(scopeName, placeholder.ruleName) },
            { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            // If the closing character of the regexp options is escaped, it is highlighted as a string
            { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
            { text: 'i', scopes: name(scopeName, placeholder.ruleName) },
            { text: '`)', scopes: name(scopeName, placeholder.ruleName, StyleName.Escape) },
            { text: 'text', scopes: name(scopeName, placeholder.ruleName) },
            { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // continuation section
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            abc := ${q}             ; comment
            (LTrim                  ; comment
              1-line                ; text
              2-line                ; text
            )${q}                   ; comment
          `,
          [
            { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '(', scopes: name(scopeName, placeholder.ruleName) },
            { text: 'LTrim', scopes: name(scopeName, placeholder.ruleName, RuleName.ContinuationOption, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, placeholder.ruleName, RuleName.InlineComment) },

            { text: '  1-line                ; text', scopes: name(scopeName, placeholder.ruleName) },
            { text: '  2-line                ; text', scopes: name(scopeName, placeholder.ruleName) },
            { text: `)${q}`, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // Do not conflict with labels
    [
      dedent`
        ${q}:${q}             ; comment
        ${q}::${q}            ; comment
      `,
      [
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
        { text: ':', scopes: name(scopeName, placeholder.ruleName) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
        { text: '::', scopes: name(scopeName, placeholder.ruleName) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],

    // Multiple occurrences of a string on a single line
    [
      dedent`
        (var ? ${q}  text  ${q} : ${q}  text  ${q})     ; comment
      `,
      [
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
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    // Fix: Beginning with a parenthesis opening is misidentified as a starting position and highlighted as an option
    [
      dedent`
        var := ${q}     ; comment
        (LTrim          ; comment
          (text         ; text
          (text)        ; text
        )${q}           ; comment
      `,
      [
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: q, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.Begin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '(', scopes: name(scopeName, placeholder.ruleName) },
        { text: 'LTrim', scopes: name(scopeName, placeholder.ruleName, RuleName.ContinuationOption, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, placeholder.ruleName, RuleName.InlineComment) },

        { text: '  (text         ; text', scopes: name(scopeName, placeholder.ruleName) },
        { text: '  (text)        ; text', scopes: name(scopeName, placeholder.ruleName) },
        { text: `)${q}`, scopes: name(scopeName, placeholder.ruleName, RuleDescriptor.End) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}

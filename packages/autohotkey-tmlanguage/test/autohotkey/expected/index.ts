import { dedent } from '@zero-plusplus/utilities/src';
import {
  name,
  RuleDescriptor,
  RuleName,
  StyleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const autohotkeynext: ScopeName = 'autohotkeynext';
  const autohotkey2: ScopeName = 'autohotkey2';
  const autohotkeyl: ScopeName = 'autohotkeyl';

  return [
    [
      dedent`
        "string"

        #Requires AutoHotkey v2.0
        "string"

        #Requires AutoHotkey v2.1
        "string"

        #Requires AutoHotkey v1.1
        "string"
      `,
      [
        { text: '"', scopes: name(autohotkey2, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'string', scopes: name(autohotkey2, RuleName.DoubleString) },
        { text: '"', scopes: name(autohotkey2, RuleName.DoubleString, RuleDescriptor.End) },

        { text: '#Requires', scopes: name(autohotkey2, RuleName.DirectiveName) },
        { text: 'AutoHotkey', scopes: name(autohotkey2, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'v2.0', scopes: name(autohotkey2, RuleName.UnquotedString, StyleName.Strong) },
        { text: '"', scopes: name(autohotkey2, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'string', scopes: name(autohotkey2, RuleName.DoubleString) },
        { text: '"', scopes: name(autohotkey2, RuleName.DoubleString, RuleDescriptor.End) },

        { text: '#Requires', scopes: name(autohotkeynext, RuleName.DirectiveName) },
        { text: 'AutoHotkey', scopes: name(autohotkeynext, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'v2.1', scopes: name(autohotkeynext, RuleName.UnquotedString, StyleName.Strong) },
        { text: '"', scopes: name(autohotkeynext, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'string', scopes: name(autohotkeynext, RuleName.DoubleString) },
        { text: '"', scopes: name(autohotkeynext, RuleName.DoubleString, RuleDescriptor.End) },

        { text: '#Requires', scopes: name(autohotkeyl, RuleName.DirectiveName) },
        { text: 'AutoHotkey', scopes: name(autohotkeyl, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'v1.1', scopes: name(autohotkeyl, RuleName.UnquotedString, StyleName.Strong) },
        { text: '"', scopes: name(autohotkeyl, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'string', scopes: name(autohotkeyl, RuleName.DoubleString) },
        { text: '"', scopes: name(autohotkeyl, RuleName.DoubleString, RuleDescriptor.End) },
      ],
    ],
  ];
}

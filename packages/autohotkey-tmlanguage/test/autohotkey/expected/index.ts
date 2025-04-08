import { dedent } from '@zero-plusplus/utilities/src';
import { RuleDescriptor, RuleName } from '../../../src/constants';
import type { ScopeName } from '../../../src/types';
import { name } from '../../../src/utils';
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
        { text: 'AutoHotkey', scopes: name(autohotkey2, RuleName.UnquotedString) },
        { text: 'v2.0', scopes: name(autohotkey2, RuleName.UnquotedString) },
        { text: '"', scopes: name(autohotkey2, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'string', scopes: name(autohotkey2, RuleName.DoubleString) },
        { text: '"', scopes: name(autohotkey2, RuleName.DoubleString, RuleDescriptor.End) },

        { text: '#Requires', scopes: name(autohotkeynext, RuleName.DirectiveName) },
        { text: 'AutoHotkey', scopes: name(autohotkeynext, RuleName.UnquotedString) },
        { text: 'v2.1', scopes: name(autohotkeynext, RuleName.UnquotedString) },
        { text: '"', scopes: name(autohotkeynext, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'string', scopes: name(autohotkeynext, RuleName.DoubleString) },
        { text: '"', scopes: name(autohotkeynext, RuleName.DoubleString, RuleDescriptor.End) },

        { text: '#Requires', scopes: name(autohotkeyl, RuleName.DirectiveName) },
        { text: 'AutoHotkey', scopes: name(autohotkeyl, RuleName.UnquotedString) },
        { text: 'v1.1', scopes: name(autohotkeyl, RuleName.UnquotedString) },
        { text: '"', scopes: name(autohotkeyl, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'string', scopes: name(autohotkeyl, RuleName.DoubleString) },
        { text: '"', scopes: name(autohotkeyl, RuleName.DoubleString, RuleDescriptor.End) },
      ],
    ],
  ];
}

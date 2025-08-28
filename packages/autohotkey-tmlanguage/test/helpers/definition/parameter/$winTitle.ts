import { name, RuleDescriptor, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';
import { $ } from './$';

export function $winTitle(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...[ 'ahk_class', 'ahk_id', 'ahk_pid', 'ahk_exe', 'ahk_group' ].flatMap((keyword): ExpectedTestData[] => {
      return [
        createCommandExpectedData(
          scopeName,
          `${keyword} %hwnd%`,
          [
            { text: keyword, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'hwnd', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
          ],
          placeholder,
        ),
      ];
    }),
    createCommandExpectedData(
      scopeName,
      'i)^[^a](?C123:abc)regexp*',
      [
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
      ],
      placeholder,
    ),
  ];
}

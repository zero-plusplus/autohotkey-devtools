import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

export function $hotkeyName(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    createCommandExpectedData(
      scopeName,
      `*Ctrl & v`,
      [
        { text: '*', scopes: name(scopeName, RuleName.HotkeyFlag) },
        { text: 'Ctrl', scopes: name(scopeName, RuleName.HotkeyLabelName) },
        { text: '&', scopes: name(scopeName, RuleName.HotkeyCombinator) },
        { text: 'v', scopes: name(scopeName, RuleName.HotkeyLabelName) },
      ],
      placeholder,
    ),
    createCommandExpectedData(
      scopeName,
      `^v`,
      [
        { text: '^', scopes: name(scopeName, RuleName.HotkeyModifier) },
        { text: 'v', scopes: name(scopeName, RuleName.HotkeyLabelName) },
      ],
      placeholder,
    ),
  ];
}

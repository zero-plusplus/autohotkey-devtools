import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';

export function $hotkeyName(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    createExpectedData(
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
    createExpectedData(
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

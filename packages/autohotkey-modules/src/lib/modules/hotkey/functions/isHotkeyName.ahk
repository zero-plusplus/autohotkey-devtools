#Requires AutoHotkey v2.1-

import './lib/modules/hotkey/inner' { hotkeyRegExp }

/**
 * Checks if it is a generic hotkey name such as `^+v`.
 * @return {boolean}
 */
export isHotkeyName(keyName) {
  return !!(keyName ~= hotkeyRegExp)
}

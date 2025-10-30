#Requires AutoHotkey v2.1-

import './lib/modules/hotkey/inner' { customCombiRegExp }

/**
 * Checks if it is a custom combination hotkey name such as `Ctrl & v`, `x & y`.
 * @return {boolean}
 */
export isCustomCombiName(keyName) {
  return !!(keyName ~= customCombiRegExp)
}

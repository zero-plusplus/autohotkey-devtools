#Requires AutoHotkey v2.1-

import './lib/modules/hotkey/inner' { hotkeyOptionsRegExp }

/**
 * Gets a hotkey options (`*`, `~` or `$`).
 * @param {string} keyName
 * @return {string | blank}
 * @example
 *   getHotkeyOptionsText('Ctrl & v')  ; ''
 *   getHotkeyOptionsText('*Ctrl & v') ; '*'
 *   getHotkeyOptionsText('+v')        ; ''
 *   getHotkeyOptionsText('~^+v')      ; '~'
 *   getHotkeyOptionsText('$~^+v')     ; '$~'
 */
export getHotkeyOptionsText(keyName) {
  RegExMatch(keyName, hotkeyOptionsRegExp, &match)
  if (match) {
    return match['option'] ?? ''
  }
  return ''
}

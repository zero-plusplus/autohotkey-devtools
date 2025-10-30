#Requires AutoHotkey v2.1-

import './lib/modules/hotkey' { getHotkeyOptionsText }

/**
 * Gets an array consisting of hotkey options (`*`, `~` or `$`).
 * @param {string} keyName
 * @return {string[]}
 * @example
 *   getHotkeyOptions('Ctrl & v')  ; []
 *   getHotkeyOptions('*Ctrl & v') ; [ '*' ]
 *   getHotkeyOptions('^+v')       ; []
 *   getHotkeyOptions('~^+v')      ; [ '~' ]
 *   getHotkeyOptions('$~^+v')     ; [ '$', '~' ]
 */
export getHotkeyOptions(keyName) {
  optionsText := (getHotkeyOptionsText(keyName)?)
  return StrSplit(optionsText)
}

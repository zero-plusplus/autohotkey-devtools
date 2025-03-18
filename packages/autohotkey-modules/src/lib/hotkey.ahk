#Requires AutoHotkey v2.1-

; https://www.autohotkey.com/docs/v2/Hotkeys.htm#Symbols
hotkeyOptionsRegExp := 'i)^(?<option>[*~$]+)'
hotkeyRegExp := 'i)^(?<option>[*~$]+)?(?<modifiers>[\s#!^+<>]+)(?<keystroke>[^&]+)$'
customCombiRegExp := 'i)^(?<option>[*~$]+)?(?<prefix>[^&\s#!\^+<>]+)\s*&\s*(?<suffix>.+)$'
/**
 * Checks if it is a generic hotkey name such as `^+v`.
 * @return {boolean}
 */
export isHotkeyName(keyName) {
  return !!(keyName ~= hotkeyRegExp)
}
/**
 * Checks if it is a custom combination hotkey name such as `Ctrl & v`, `x & y`.
 * @return {boolean}
 */
export isCustomCombiName(keyName) {
  return !!(keyName ~= customCombiRegExp)
}
/**
 * Gets an array consisting of hotkey options (`*`, `~` or `$`).
 * @param {string} keyName
 * @return {string[]}
 * @example
 * getHotkeyOptions('Ctrl & v')  ; []
 * getHotkeyOptions('*Ctrl & v') ; [ '*' ]
 * getHotkeyOptions('^+v')       ; []
 * getHotkeyOptions('~^+v')      ; [ '~' ]
 * getHotkeyOptions('$~^+v')     ; [ '$', '~' ]
 */
export getHotkeyOptions(keyName) {
  optionsText := (getHotkeyOptionsText(keyName)?)
  return StrSplit(optionsText)
}
/**
 * Gets a hotkey options (`*`, `~` or `$`).
 * @param {string} keyName
 * @return {string | blank}
 * @example
 * getHotkeyOptionsText('Ctrl & v')  ; ''
 * getHotkeyOptionsText('*Ctrl & v') ; '*'
 * getHotkeyOptionsText('+v')        ; ''
 * getHotkeyOptionsText('~^+v')      ; '~'
 * getHotkeyOptionsText('$~^+v')     ; '$~'
 */
export getHotkeyOptionsText(keyName) {
  RegExMatch(keyName, hotkeyOptionsRegExp, &match)
  if (match) {
    return match['option'] ?? ''
  }
  return ''
}

#Requires AutoHotkey v2.1-

; https://www.autohotkey.com/docs/v2/Hotkeys.htm#Symbols
hotkeyOptionsRegExp := 'i)^(?<option>[*~$]+)'
hotkeyRegExp := 'i)^(?<option>[*~$]+)?(?<modifiers>[\s#!^+<>]+)(?<keystroke>[^&]+)$'
customCombiRegExp := 'i)^(?<option>[*~$]+)?(?<prefix>[^&\s#!\^+<>]+)\s*&\s*(?<suffix>.+)$'
/**
 * Check if it is a generic hotkey name such as `^+v`.
 * @return {boolean}
 */
export isHotkeyName(keyName) {
  return !!(keyName ~= hotkeyRegExp)
}
/**
 * Check if it is a custom combination hotkey name such as `Ctrl & v`, `x & y`.
 * @return {boolean}
 */
export isCustomCombiName(keyName) {
  return !!(keyName ~= customCombiRegExp)
}

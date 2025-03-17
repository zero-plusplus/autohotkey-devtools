#Requires AutoHotkey v2.1-

; https://www.autohotkey.com/docs/v2/Hotkeys.htm#Symbols
hotkeyOptionsRegExp := 'i)^(?<option>[*~$]+)'
hotkeyRegExp := 'i)^(?<option>[*~$]+)?(?<modifiers>[\s#!^+<>]+)(?<keystroke>[^&]+)$'
customCombiRegExp := 'i)^(?<option>[*~$]+)?(?<prefix>[^&\s#!\^+<>]+)\s*&\s*(?<suffix>.+)$'
export isHotkeyName(keyName) {
  return !!(keyName ~= hotkeyRegExp)
}
export isCustomCombiName(keyName) {
  return !!(keyName ~= customCombiRegExp)
}

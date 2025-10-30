#Requires AutoHotkey v2.1-

; https://www.autohotkey.com/docs/v2/Hotkeys.htm#Symbols
export hotkeyOptionsRegExp := 'i)^(?<option>[*~$]+)'
export hotkeyRegExp := 'i)^(?<option>[*~$]+)?(?<modifiers>[\s#!^+<>]+)(?<keystroke>[^&]+)$'
export customCombiRegExp := 'i)^(?<option>[*~$]+)?(?<prefix>[^&\s#!\^+<>]+)\s*&\s*(?<suffix>.+)$'

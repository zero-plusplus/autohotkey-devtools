// #region compiler directive
// https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#Intro2
export const compilerDirectiveEscapeSequences = [
  '``',
  '`,',
  '`n',
  '`r',
  '`t',
] as const;

// https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#Intro2
export const compilerDirectiveVariables = [
  // Group 1
  'A_AhkPath',
  'A_AppData',
  'A_AppDataCommon',
  'A_ComputerName',
  'A_ComSpec',
  'A_Desktop',
  'A_DesktopCommon',
  'A_MyDocuments',
  'A_ProgramFiles',
  'A_Programs',
  'A_ProgramsCommon',
  'A_ScriptDir',
  'A_ScriptFullPath',
  'A_ScriptName',
  'A_Space',
  'A_StartMenu',
  'A_StartMenuCommon',
  'A_Startup',
  'A_StartupCommon',
  'A_Tab',
  'A_Temp',
  'A_UserName',
  'A_WinDir',

  // Group 2
  'A_AhkVersion',
  'A_IsCompiled',
  'A_PtrSize',

  // Special variable
  'A_WorkFileName',
  'A_BasePath',
  'A_PriorLine',
] as const;
// #endregion compiler directive

// #region hotkey
export const hotkeyFlags = [
  '*',
  '~',
  '$',
] as const;
export const modifierSymbols = [
  '#',
  '!',
  '^',
  '+',
  '^',
  '+',
  '<',
  '>',
  '<^>!',
] as const;

// https://www.autohotkey.com/docs/v1/KeyList.htm
export const keyNameList = [
  'LButton',
  'RButton',
  'MButton',
  'XButton1',
  'XButton2',
  'WheelDown',
  'WheelUp',
  'WheelLeft',
  'WheelRight',
  'CapsLock',
  'Space',
  'Tab',
  'Enter',
  'Escape',
  'Esc',
  'Backspace',
  'BS',
  'ScrollLock',
  'Delete',
  'Del',
  'Insert',
  'Ins',
  'Home',
  'End',
  'PgUp',
  'PgDn',
  'Up',
  'Down',
  'Left',
  'Right',
  'Numpad0',
  'Numpad1',
  'Numpad2',
  'Numpad3',
  'Numpad4',
  'Numpad5',
  'Numpad6',
  'Numpad7',
  'Numpad8',
  'Numpad9',
  'NumpadDot',
  'NumpadIns',
  'NumpadEnd',
  'NumpadDown',
  'NumpadPgDn',
  'NumpadLeft',
  'NumpadClear',
  'NumpadRight',
  'NumpadHome',
  'NumpadUp',
  'NumpadPgUp',
  'NumpadDel',
  'NumLock',
  'NumpadDiv',
  'NumpadMult',
  'NumpadAdd',
  'NumpadSub',
  'NumpadEnter',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'F13',
  'F14',
  'F15',
  'F16',
  'F17',
  'F18',
  'F19',
  'F20',
  'F21',
  'F22',
  'F23',
  'F24',
  'LWin',
  'RWin',
  'Control',
  'Ctrl',
  'Alt',
  'Shift',
  'LControl',
  'LCtrl',
  'RControl',
  'RCtrl',
  'LShift',
  'RShift',
  'LAlt',
  'RAlt',
  'Browser_Back',
  'Browser_Forward',
  'Browser_Refresh',
  'Browser_Stop',
  'Browser_Search',
  'Browser_Favorites',
  'Browser_Home',
  'Volume_Mute',
  'Volume_Down',
  'Volume_Up',
  'Media_Next',
  'Media_Prev',
  'Media_Stop',
  'Media_Play_Pause',
  'Launch_Mail',
  'Launch_Media',
  'Launch_App1',
  'Launch_App2',
  'AppsKey',
  'PrintScreen',
  'CtrlBreak',
  'Pause',
  'Break',
  'Help',
  'Sleep',
  'Joy1',
  'Joy2',
  'Joy3',
  'Joy4',
  'Joy5',
  'Joy6',
  'Joy7',
  'Joy8',
  'Joy9',
  'Joy10',
  'Joy11',
  'Joy12',
  'Joy13',
  'Joy14',
  'Joy15',
  'Joy16',
  'Joy17',
  'Joy18',
  'Joy19',
  'Joy20',
  'Joy21',
  'Joy22',
  'Joy23',
  'Joy24',
  'Joy25',
  'Joy26',
  'Joy27',
  'Joy28',
  'Joy29',
  'Joy20',
  'Joy31',
  'Joy32',
] as const;

// https://www.autohotkey.com/docs/v1/lib/Send.htm#Special_modes
export const sendSpecialModeList = [
  'Blind',
  'Raw',
  'Text',
] as const;
// #endregion hotkey

// https://www.autohotkey.com/docs/v1/lib/Progress.htm#colors
export const colorNames = [
  'Black',
  'Silver',
  'Gray',
  'White',
  'Maroon',
  'Red',
  'Purple',
  'Fuchsia',
  'Green',
  'Lime',
  'Olive',
  'Yellow',
  'Navy',
  'Blue',
  'Teal',
  'Aqua',
] as const;

// #region operators
// https://www.autohotkey.com/docs/v2/Variables.htm#Operators
// https://www.autohotkey.com/docs/v1/Variables.htm#Operators
export const assignmentOperators = [
  ':=', // e.g. `a := 1`
  '+=', // e.g. `a += 1`
  '-=', // e.g. `a -= 1`
  '*=', // e.g. `a *= 1`
  '/=', // e.g. `a /= 1`
  '//=', // e.g. `a //= 1`
  '.=', // e.g. `a .= 1`
  '|=', // e.g. `a |= 1`
  '&=', // e.g. `a &= 1`
  '^=', // e.g. `a ^= 1`
  '>>=', // e.g. `a >>= 1`
  '<<=', // e.g. `a <<= 1`
  '>>>=', // e.g. `a >>>= 1`
] as const;

export const expressionOperatorsWithoutAssignment = [
  '+', // e.g. `+1`, `1 + 1`
  '++', // e.g. `++1`, `1++`
  '-', // e.g. `-1`, `1 - 1`
  '--', // e.g. `--1`, `1--`
  '*', // e.g. `1 * 1`, `*expression`
  '**', // e.g. `1 ** 1`
  '/', // e.g. `1 / 1`
  '//', // e.g. `1 // 1`
  '.', // e.g. `1 . 1`, `obj.member`
  '~', // e.g. `~1`
  '&', // e.g. `&var`, `1 & 1`
  '|', // e.g. `1 | 1`
  '^', // e.g. `1 ^ 1`
  '<<', // e.g. `1 << 1`
  '>>', // e.g. `1 >> 1`
  '>>>', // e.g. `1 >>> 1`
  '!', // e.g. `!expression`
  '&&', // e.g. `1 && 1`
  '||', // e.g. `1 || 1`
  '>', // e.g. `1 > 1`
  '>=', // e.g. `1 >= 1`
  '<', // e.g. `1 < 1`
  '<=', // e.g. `1 <= 1`
  '=', // e.g. `1 = 1`
  '==', // e.g. `1 == 1`
  '?', // e.g. `a ? b : c`, `a?.b`
  ':', // e.g. `a ? b : c`
  '~=', // e.g. value ~= "i)abc"
] as const;

export const expressionKeywords = [
  'NOT', // e.g. `not expression`
  'AND', // e.g. `1 and 1`
  'OR', // e.g. `1 or 1`
] as const;
// #endregion operators

// #region regexp
export const regexpOptions = [ 'i', 'm', 's', 'x', 'A', 'D', 'J', 'U', 'X', 'S', 'C', '`a', '`n', '`r' ] as const;
export const regexpEscapeSequences = [ '\\.', '\\*', '\\?', '\\+', '\\[', '\\{', '\\|', '\\(', '\\)', '\\^', '\\$', '\\\\' ] as const;
export const commonPcreUnicodeProperyCodes = [
  // https://www.autohotkey.com/docs/v1/misc/RegEx-QuickRef.htm#slashP
  // https://www.autohotkey.com/docs/v2/misc/RegEx-QuickRef.htm#slashP
  // https://www.pcre.org/pcre.txt
  'C', // Other
  'Cc', // Control
  'Cf', // Format
  'Cn', // Unassigned
  'Co', // Private use
  'Cs', // Surrogate
  'L', // Letter
  'Ll', // Lower case letter
  'Lm', // Modifier letter
  'Lo', // Other letter
  'Lt', // Title case letter
  'Lu', // Upper case letter
  'M', // Mark
  'Mc', // Spacing mark
  'Me', // Enclosing mark
  'Mn', // Non-spacing mark
  'N', // Number
  'Nd', // Decimal number
  'Nl', // Letter number
  'No', // Other number
  'P', // Punctuation
  'Pc', // Connector punctuation
  'Pd', // Dash punctuation
  'Pe', // Close punctuation
  'Pf', // Final punctuation
  'Pi', // Initial punctuation
  'Po', // Other punctuation
  'Ps', // Open punctuation
  'S', // Symbol
  'Sc', // Currency symbol
  'Sk', // Modifier symbol
  'Sm', // Mathematical symbol
  'So', // Other symbol
  'Z', // Separator
  'Zl', // Line separator
  'Zp', // Paragraph separator
  'Zs', // Space separator
] as const;
export const commonPcreUnicodeProperyScripts = [
  'Common',

  'Arabic',
  'Armenian',
  'Avestan',
  'Balinese',
  'Bamum',
  'Bassa_Vah',
  'Batak',
  'Bengali',
  'Bopomofo',
  'Brahmi',
  'Braille',
  'Buginese',
  'Buhid',
  'Canadian_Aboriginal',
  'Car-ian',
  'Caucasian_Albanian',
  'Chakma',
  'Cham',
  'Cherokee',
  'Common',
  'Coptic',
  'Cunei-form',
  'Cypriot',
  'Cyrillic',
  'Deseret',
  'Devanagari',
  'Duployan',
  'Egyptian_Hiero-glyphs',
  'Elbasan',
  'Ethiopic',
  'Georgian',
  'Glagolitic',
  'Gothic',
  'Grantha',
  'Greek',
  'Gujarati',
  'Gurmukhi',
  'Han',
  'Hangul',
  'Hanunoo',
  'Hebrew',
  'Hiragana',
  'Im-perial_Aramaic',
  'Inherited',
  'Inscriptional_Pahlavi',
  'Inscrip-tional_Parthian',
  'Javanese',
  'Kaithi',
  'Kannada',
  'Katakana',
  'Kayah_Li',
  'Kharoshthi',
  'Khmer',
  'Khojki',
  'Khudawadi',
  'Lao',
  'Latin',
  'Lepcha',
  'Limbu',
  'Lin-ear_A',
  'Linear_B',
  'Lisu',
  'Lycian',
  'Lydian',
  'Mahajani',
  'Malayalam',
  'Mandaic',
  'Manichaean',
  'Meetei_Mayek',
  'Mende_Kikakui',
  'Meroitic_Cursive',
  'Meroitic_Hi-eroglyphs',
  'Miao',
  'Modi',
  'Mongolian',
  'Mro',
  'Myanmar',
  'Nabataean',
  'New_Tai_Lue',
  'Nko',
  'Ogham',
  'Ol_Chiki',
  'Old_Italic',
  'Old_North_Arabian',
  'Old_Permic',
  'Old_Persian',
  'Old_South_Arabian',
  'Old_Turkic',
  'Oriya',
  'Osmanya',
  'Pa-hawh_Hmong',
  'Palmyrene',
  'Pau_Cin_Hau',
  'Phags_Pa',
  'Phoenician',
  'Psalter_Pahlavi',
  'Rejang',
  'Runic',
  'Samaritan',
  'Saurashtra',
  'Sharada',
  'Sha-vian',
  'Siddham',
  'Sinhala',
  'Sora_Sompeng',
  'Sundanese',
  'Syloti_Nagri',
  'Syriac',
  'Tagalog',
  'Tagbanwa',
  'Tai_Le',
  'Tai_Tham',
  'Tai_Viet',
  'Takri',
  'Tamil',
  'Telugu',
  'Thaana',
  'Thai',
  'Tibetan',
  'Tifinagh',
  'Tirhuta',
  'Ugaritic',
  'Vai',
  'Warang_Citi',
  'Yi',
] as const;
// #endregion regexp

// #region misc
export const accessModifiers = [ 'local', 'global', 'static' ] as const;
// #endregion misc

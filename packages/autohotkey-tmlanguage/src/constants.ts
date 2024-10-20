// #region constant
export const scopeNames = [ 'autohotkey', 'autohotkeynext', 'autohotkeyl', 'autohotkey2' ] as const;

// https://www.autohotkey.com/docs/v1/lib/index.htm
export const commandNames = [
  'AutoTrim',
  'BlockInput',
  'Click',
  'ClipWait',
  'Control',
  'ControlClick',
  'ControlFocus',
  'ControlGet',
  'ControlGetFocus',
  'ControlGetPos',
  'ControlGetText',
  'ControlMove',
  'ControlSend',
  'ControlSendRaw',
  'ControlSetText',
  'CoordMode',
  'Critical',
  'DetectHiddenText',
  'DetectHiddenWindows',
  'Drive',
  'DriveGet',
  'DriveSpaceFree',
  'Edit',
  'EnvAdd',
  'EnvDiv', // Deprecated
  'EnvGet',
  'EnvMult', // Deprecated
  'EnvSet',
  'EnvSub',
  'EnvUpdate',
  'FileAppend',
  'FileCopy',
  'FileCopyDir',
  'FileCreateDir',
  'FileCreateShortcut',
  'FileDelete',
  'FileEncoding',
  'FileInstall',
  'FileGetAttrib',
  'FileGetShortcut',
  'FileGetSize',
  'FileGetTime',
  'FileGetVersion',
  'FileMove',
  'FileMoveDir',
  'FileRead',
  'FileReadLine',
  'FileRecycle',
  'FileRecycleEmpty',
  'FileRemoveDir',
  'FileSelectFile',
  'FileSelectFolder',
  'FileSetAttrib',
  'FileSetTime',
  'FormatTime',
  'GetKeyState', // Deprecated
  'Gosub',
  'Goto',
  'GroupActivate',
  'GroupAdd',
  'GroupClose',
  'GroupDeactivate',
  'Gui',
  'GuiControl',
  'GuiControlGet',
  'Hotkey',
  'ImageSearch',
  'IniDelete',
  'IniRead',
  'IniWrite',
  'Input',
  'InputBox',
  'KeyHistory',
  'KeyWait',
  'ListHotkeys',
  'ListLines',
  'ListVars',
  'Menu',
  'MouseClick',
  'MouseClickDrag',
  'MouseGetPos',
  'MouseMove',
  'MsgBox',
  'OnExit', // Deprecated
  'OutputDebug',
  'PixelGetColor',
  'PixelSearch',
  'PostMessage',
  'Process',
  'Progress', // Deprecated
  'Random',
  'RegDelete',
  'RegRead',
  'RegWrite',
  'Reload',
  'Run',
  'RunAs',
  'RunWait',
  'Send',
  'SendRaw',
  'SendInput',
  'SendPlay',
  'SendEvent',
  'SendLevel',
  'SendMessage',
  'SendMode',
  'SetBatchLines',
  'SetCapsLockState',
  'SetControlDelay',
  'SetDefaultMouseSpeed',
  'SetEnv', // Deprecated
  'SetFormat', // Deprecated
  'SetKeyDelay',
  'SetMouseDelay',
  'SetNumLockState',
  'SetScrollLockState',
  'SetRegView',
  'SetStoreCapsLockMode',
  'SetTimer',
  'SetTitleMatchMode',
  'SetWinDelay',
  'SetWorkingDir',
  'Sleep',
  'Sort',
  'SoundBeep',
  'SoundGet',
  'SoundGetWaveVolume',
  'SoundPlay',
  'SoundSet',
  'SoundSetWaveVolume',
  'SplashImage',
  'SplashTextOn',
  'SplashTextOff',
  'SplitPath',
  'StatusBarGetText',
  'StatusBarWait',
  'StringCaseSense',
  'StringGetPos', // Deprecated
  'StringLeft', // Deprecated
  'StringLen', // Deprecated
  'StringLower',
  'StringMid', // Deprecated
  'StringReplace', // Deprecated
  'StringRight', // Deprecated
  'StringSplit', // Deprecated
  'StringTrimLeft', // Deprecated
  'StringTrimRight', // Deprecated
  'StringUpper',
  'SysGet',
  'Thread',
  'ToolTip',
  'Transform', // Deprecated
  'TrayTip',
  'UrlDownloadToFile',
  'WinActivate',
  'WinActivateBottom',
  'WinClose',
  'WinGetActiveStats',
  'WinGetActiveTitle',
  'WinGetClass',
  'WinGet',
  'WinGetPos',
  'WinGetText',
  'WinGetTitle',
  'WinHide',
  'WinKill',
  'WinMaximize',
  'WinMenuSelectItem',
  'WinMinimize',
  'WinMinimizeAll',
  'WinMinimizeAllUndo',
  'WinMove',
  'WinRestore',
  'WinSet',
  'WinSetTitle',
  'WinShow',
  'WinWait',
  'WinWaitActive',
  'WinWaitNotActive',
  'WinWaitClose',
] as const;

// #region operators
// https://www.autohotkey.com/docs/v2/Variables.htm#Operators
// https://www.autohotkey.com/docs/v1/Variables.htm#Operators
export const commonOperators = [
  '+',    // e.g. `+1`, `1 + 1`
  '++',   // e.g. `++1`, `1++`
  '-',    // e.g. `-1`, `1 - 1`
  '--',   // e.g. `--1`, `1--`
  '*',    // e.g. `1 * 1`, `*expression`
  '**',   // e.g. `1 ** 1`
  '/',    // e.g. `1 / 1`
  '//',   // e.g. `1 // 1`
  '.',    // e.g. `1 . 1`, `obj.member`
  '~',    // e.g. `~1`
  '&',    // e.g. `&var`, `1 & 1`
  '|',    // e.g. `1 | 1`
  '^',    // e.g. `1 ^ 1`
  '<<',   // e.g. `1 << 1`
  '>>',   // e.g. `1 >> 1`
  '>>>',  // e.g. `1 >>> 1`
  '%',    // e.g. `%var%`, `a%b%c`
  '!',    // e.g. `!expression`
  'NOT',  // e.g. `not expression`
  '&&',   // e.g. `1 && 1`
  'AND',  // e.g. `1 and 1`
  '||',   // e.g. `1 || 1`
  'OR',   // e.g. `1 or 1`
  '>',    // e.g. `1 > 1`
  '>=',   // e.g. `1 >= 1`
  '<',    // e.g. `1 < 1`
  '<=',   // e.g. `1 <= 1`
  '=',    // e.g. `1 = 1`
  '==',   // e.g. `1 == 1`
  '?',    // e.g. `a ? b : c`, `a?.b`
  ':',    // e.g. `a ? b : c`
  ':=',   // e.g. `a := 1`
  '+=',   // e.g. `a += 1`
  '-=',   // e.g. `a -= 1`
  '*=',   // e.g. `a *= 1`
  '/=',   // e.g. `a /= 1`
  '//=',  // e.g. `a //= 1`
  '.=',   // e.g. `a .= 1`
  '|=',   // e.g. `a |= 1`
  '&=',   // e.g. `a &= 1`
  '^=',   // e.g. `a ^= 1`
  '>>=',  // e.g. `a >>= 1`
  '<<=',  // e.g. `a <<= 1`
  '>>>=', // e.g. `a >>>= 1`
  ',',    // e.g. `a, b`
] as const;
export const operators_v1: [ ...typeof commonOperators, '<>' ] = [
  ...commonOperators,
  '<>', // e.g. `1 <> 1` Deprecated
] as const;
export const operators_v2: [ ...typeof commonOperators, '=>', '??' ] = [
  ...commonOperators,
  '=>', // `(args*) => expression`
  '??', // `a ?? b`
] as const;
// #endregion operators

// #endregion constant

// #region enum
export const enum Repository {
  Self = '$self',

  // #region trivas
  Comment = 'repository.comment',
  SingleLineComment = 'repository.comment.single-line',
  InLineComment = 'repository.comment.in-line',
  // #endregion trivas

  // #region statements
  Statement = 'repository.statement',
  ExpressionStatement = 'repository.statement.expression',
  CommandStatement = 'repository.statement.command',
  LegacyStatement = 'repository.statement.legacy.expression',
  // #endregion statements

  // #region expressions
  Expression = 'repository.expression',
  ParenthesizedExpression = 'repository.expression.parenthesized',

  // #region literal
  Literal = 'repository.expression.literal',

  // #region string
  String = 'repository.expression.string',
  InvalidStringContent = 'repository.expression.string.content.invalid',
  DoubleString = 'repository.expression.string.double-quote',
  DoubleStringEscapeSequence = 'repository.expression.string.content.escape-sequence.double-quote',
  SingleString = 'repository.expression.string.single-quote',
  SingleStringEscapeSequence = 'repository.expression.string.content.escape-sequence.single-quote',
  // #endregion string
  // #region number
  Number = 'repository.expression.number',
  Integer = 'repository.expression.number.integer',
  Float = 'repository.expression.number.float',
  InvalidFloat = 'repository.expression.number.float.invalid',
  Hex = 'repository.expression.number.hex',
  InvalidHex = 'repository.expression.number.hex.invalid',
  ScientificNotation = 'repository.expression.number.scientific-notation',
  InvalidScientificNotation = 'repository.expression.number.scientific-notation.invalid',
  // #endregion number
  // #endregion literal

  // #region variable
  Variable = 'repository.expression.variable',
  BuiltInVariable = 'repository.expression.variable.built-in',
  InvalidVariable = 'repository.expression.variable.invalid',
  // #endregion variable

  // #region access
  Dereference = 'repository.expression.dereference',
  InvalidDereference = 'repository.expression.dereference.invalid',
  // #endregion access
  // #endregion expressions

  // #region operators
  Operator = 'repository.operator.without-comma',
  Comma = 'repository.operator.comma',
  // #endregion operators

  // #region v1 syntax
  Command = 'repository.command',
  CommonCommand = 'repository.common-command',
  CommandArgument = 'repository.command.argument',
  CommandArgumentText = 'repository.command.argument.text',
  CommandArgumentControlStyleText = 'repository.command.argument.text.control-style',
  // #endregion v1 syntax

  // #region legacy
  Legacy = 'repository.legacy',
  LegacyAssignment = 'repository.legacy.expression.assignment',
  LegacyTextEscapeSequence = 'repository.legacy.expression.content.escape-sequence.unquote',
  PercentExpression = 'repository.legacy.expression.percent',
  // #endregion legacy
}

// https://macromates.com/manual/en/language_grammars#naming_conventions
// https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/dark_vs.json
// https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/dark_plus.json
export const enum RuleName {
  Emphasis = 'emphasis',

  // #region statement
  DirectiveName = 'meta.preprocessor.directive',
  // #endregion statement
  // #region legacy
  LegacyAssignment = 'expression.legacy.assignment',
  LegacyText = 'string.legacy.text',
  LegacyTextEscapeSequence = 'constant.character.escape.legacy.text',
  ForceExpression = 'expression.legacy.expression.force',
  ForceExpressionPercent = 'punctuation.definition.expression.force',
  CommandName = 'support.function.command',
  SubCommandName = 'strong string.legacy.subcommand',
  CommandArgumentSeparator = 'punctuation.definition.command.argument.separator',
  CommandArgumentKeyword = 'strong string.legacy.text',
  InvalidCommandArgument = 'invalid.illegal.command.argument',
  // #endregion legacy
  // #region comment
  SingleLineComment = 'comment.single-line',
  InLineComment = 'comment.in-line',
  // #endregion comment
  // #region expression
  Expression = 'expression',
  ParenthesizedExpression = 'expression.parenthesized',

  // #region variable
  Variable = 'variable.other',
  InvalidVariable = 'invalid.illegal.variable',
  BuiltInVariable = 'support.variable',
  // #endregion variable
  // #region access
  Dereference = 'expression.dereference',
  DereferencePercentBegin = 'punctuation.definition.dereference.begin',
  DereferencePercentEnd = 'punctuation.definition.dereference.end',
  InvalidDereference = 'invalid.illegal.dereference',
  InvalidDereferencePercent = 'invalid.illegal.dereference.percent',
  // #endregion access
  // #region string
  DoubleString = 'string.quoted.double',
  InvalidSingleLineStringContent = 'invalid.illegal.content',
  InvalidStringNewLine = 'invalid.illegal.newline',
  DoubleStringEscapeSequence = 'constant.character.escape.double',
  SingleStringEscapeSequence = 'constant.character.escape.single',
  SingleString = 'string.quoted.single',
  MultiLineString = 'string.quoted.unquoted',
  StringBegin = 'punctuation.definition.string.begin',
  StringEnd = 'punctuation.definition.string.end',
  // #endregion string
  // #region number
  InvalidNumber = 'invalid.illegal.number',
  Integer = 'constant.numeric.integer',
  DecimalPart = 'constant.numeric.decimal.part',
  Float = 'constant.numeric.float',
  DecimalPoint = 'constant.numeric.decimal.point',
  Hex = 'constant.numeric.hex',
  HexPrefix = 'constant.numeric.hex.prefix',
  HexValue = 'constant.numeric.hex.value',
  ScientificNotation = 'constant.numeric.scientificnotation',
  ENotation = 'constant.numeric.e-notation',
  ExponentPlusMinusSign = 'constant.numeric.exponent.plus-minus.sign',
  Exponent = 'constant.numeric.exponent',
  // #endregion number
  // #region operator
  Operator = 'keyword.operator',
  Equals = 'keyword.operator.equals',
  // #endregion operator
  // #endregion expression
  // #region token
  Comma = 'punctuation.separator.comma',
  OpenParen = 'meta.brace.round.begin',
  CloseParen = 'meta.brace.round.end',
}
export const enum CommandArgsType {
  None = 0,
  Expression,
  Enum,
  Legacy,
  SubCommand,
  Input,
  Output,

  Parameters, // e.g. `ControlClick x123 y123`, `Click, 100 100 LButton`
  ControlStyle,
}
// #endregion enum

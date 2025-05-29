import {
  command, decimalOptionItem, encoding, expression, includeLib, keywordOnly, optionItem, quotableUnquoted, requiresVersion,
  signature, signedNumberOptionItem, toggleOptionItem, unquoted, unquotedAndBoolean, unquotedInteger,
  type CommandDefinition,
} from '../definition';

// #region directives
export const directiveDefinitions: CommandDefinition[] = [
  // https://www.autohotkey.com/docs/v2/lib/_ClipboardTimeout.htm
  command('#ClipboardTimeout', signature([ unquotedInteger() ])),

  // https://www.autohotkey.com/docs/v2/lib/_DllLoad.htm
  command('#DllLoad', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v2/lib/_ErrorStdOut.htm
  command('#ErrorStdOut', signature([ quotableUnquoted(...encoding().itemPatterns!) ])),

  // https://www.autohotkey.com/docs/v2/lib/_HotIf.htm
  command('#HotIf', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v2/lib/_HotIfTimeout.htm
  command('#HotIfTimeout', signature([ unquotedInteger() ])),

  // https://www.autohotkey.com/docs/v2/lib/_Hotstring.htm
  command('#Hotstring', signature([ unquoted([ optionItem('NoMouse', 'EndChars', 'SI', 'SP', 'SE', 'X'), toggleOptionItem('*', '?', 'B', 'C', 'O', 'R', 'T', 'Z'), decimalOptionItem('P'), signedNumberOptionItem('K') ]) ])),

  // https://www.autohotkey.com/docs/v2/lib/_Include.htm
  command('#Include', signature([ includeLib() ])),
  command('#IncludeAgain', signature([ includeLib() ])),

  // https://www.autohotkey.com/docs/v2/lib/_InputLevel.htm
  command('#InputLevel', signature([ unquotedInteger() ])),

  // https://www.autohotkey.com/docs/v2/lib/_MaxThreads.htm
  command('#MaxThreads', signature([ unquotedInteger() ])),

  // https://www.autohotkey.com/docs/v2/lib/_MaxThreadsBuffer.htm
  command('#MaxThreadsBuffer', signature([ unquotedAndBoolean() ])),

  // https://www.autohotkey.com/docs/v2/lib/_MaxThreadsPerHotkey.htm
  command('#MaxThreadsPerHotkey', signature([ unquotedInteger() ])),

  // https://www.autohotkey.com/docs/v2/lib/_NoTrayIcon.htm
  command('#NoTrayIcon', signature([])),

  // https://www.autohotkey.com/docs/v2/lib/_Requires.htm
  command('#Requires', signature([ requiresVersion() ])),

  // https://www.autohotkey.com/docs/v2/lib/_SingleInstance.htm
  command('#SingleInstance', signature([ keywordOnly([ optionItem('Force', 'Ignore', 'Prompt', 'Off') ]) ])),

  // https://www.autohotkey.com/docs/v2/lib/_SuspendExempt.htm
  command('#SuspendExempt', signature([ unquotedAndBoolean() ])),

  // https://www.autohotkey.com/docs/v2/lib/_UseHook.htm
  command('#UseHook', signature([ unquotedAndBoolean() ])),

  // https://www.autohotkey.com/docs/v2/lib/_Warn.htm
  command('#Warn', signature([ keywordOnly([ optionItem('VarUnset', 'LocalSameAsGlobal', 'Unreachable', 'All') ]), keywordOnly([ optionItem('MsgBox', 'StdOut', 'OutputDebug', 'Off') ]) ])),

  // https://www.autohotkey.com/docs/v2/lib/_WinActivateForce.htm
  command('#WinActivateForce', signature([])),
];
// #endregion directives

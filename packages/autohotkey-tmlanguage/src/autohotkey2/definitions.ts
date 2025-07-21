import {
  $, $quotable, $shouldBoolean, $shouldInteger, command, decimalOptionItem, expression, keywordOnly, keywordOption, parameterless,
  quotableEncoding, quotableIncludeLib, requiresVersion, signature, signedNumberOptionItem, signOptionItem, toggleOptionItem,
  type CommandDefinition,
} from '../definition';

// #region directives
export const directiveDefinitions: CommandDefinition[] = [
  // https://www.autohotkey.com/docs/v2/lib/_ClipboardTimeout.htm
  command('#ClipboardTimeout', signature([ $shouldInteger() ])),

  // https://www.autohotkey.com/docs/v2/lib/_DllLoad.htm
  command('#DllLoad', signature([ $quotable([ signOptionItem('*i') ]) ])),

  // https://www.autohotkey.com/docs/v2/lib/_ErrorStdOut.htm
  command('#ErrorStdOut', signature([ quotableEncoding() ])),

  // https://www.autohotkey.com/docs/v2/lib/_HotIf.htm
  command('#HotIf', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v2/lib/_HotIfTimeout.htm
  command('#HotIfTimeout', signature([ $shouldInteger() ])),

  // https://www.autohotkey.com/docs/v2/lib/_Hotstring.htm
  command('#Hotstring', signature([ $([ keywordOption('NoMouse', 'EndChars', 'SI', 'SP', 'SE', 'X'), toggleOptionItem('*', '?', 'B', 'C', 'O', 'R', 'T', 'Z'), decimalOptionItem('P'), signedNumberOptionItem('K') ]) ])),

  // https://www.autohotkey.com/docs/v2/lib/_Include.htm
  command('#Include', signature([ quotableIncludeLib() ])),
  command('#IncludeAgain', signature([ quotableIncludeLib() ])),

  // https://www.autohotkey.com/docs/v2/lib/_InputLevel.htm
  command('#InputLevel', signature([ $shouldInteger() ])),

  // https://www.autohotkey.com/docs/v2/lib/_MaxThreads.htm
  command('#MaxThreads', signature([ $shouldInteger() ])),

  // https://www.autohotkey.com/docs/v2/lib/_MaxThreadsBuffer.htm
  command('#MaxThreadsBuffer', signature([ $shouldBoolean() ])),

  // https://www.autohotkey.com/docs/v2/lib/_MaxThreadsPerHotkey.htm
  command('#MaxThreadsPerHotkey', signature([ $shouldInteger() ])),

  // https://www.autohotkey.com/docs/v2/lib/_NoTrayIcon.htm
  command('#NoTrayIcon', signature(parameterless())),

  // https://www.autohotkey.com/docs/v2/lib/_Requires.htm
  command('#Requires', signature([ requiresVersion() ])),

  // https://www.autohotkey.com/docs/v2/lib/_SingleInstance.htm
  command('#SingleInstance', signature([ keywordOnly([ keywordOption('Force', 'Ignore', 'Prompt', 'Off') ]) ])),

  // https://www.autohotkey.com/docs/v2/lib/_SuspendExempt.htm
  command('#SuspendExempt', signature([ $shouldBoolean() ])),

  // https://www.autohotkey.com/docs/v2/lib/_UseHook.htm
  command('#UseHook', signature([ $shouldBoolean() ])),

  // https://www.autohotkey.com/docs/v2/lib/_Warn.htm
  command('#Warn', signature([ keywordOnly([ keywordOption('VarUnset', 'LocalSameAsGlobal', 'Unreachable', 'All') ]), keywordOnly([ keywordOption('MsgBox', 'StdOut', 'OutputDebug', 'Off') ]) ])),

  // https://www.autohotkey.com/docs/v2/lib/_WinActivateForce.htm
  command('#WinActivateForce', signature(parameterless())),
];
// #endregion directives

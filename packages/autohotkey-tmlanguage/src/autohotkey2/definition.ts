import { command, expression, keywordOnly, signature, unquoted } from '../autohotkeyl/definition';
import type { CommandDefinition } from '../types';

// #region directives
export const directiveDefinitions: CommandDefinition[] = [
  // https://www.autohotkey.com/docs/v2/lib/_ClipboardTimeout.htm
  command('#ClipboardTimeout', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v2/lib/_DllLoad.htm
  command('#DllLoad', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v2/lib/_ErrorStdOut.htm
  command('#ErrorStdOut', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v2/lib/_HotIf.htm
  command('#HotIf', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v2/lib/_HotIfTimeout.htm
  command('#HotIfTimeout', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v2/lib/_Hotstring.htm
  command('#Hotstring', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v2/lib/_InputLevel.htm
  command('#InputLevel', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v2/lib/_MaxThreads.htm
  command('#MaxThreads', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v2/lib/_MaxThreadsBuffer.htm
  command('#MaxThreadsBuffer', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v2/lib/_MaxThreadsPerHotkey.htm
  command('#MaxThreadsPerHotkey', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v2/lib/_NoTrayIcon.htm
  command('#NoTrayIcon', signature([])),

  // https://www.autohotkey.com/docs/v2/lib/_SingleInstance.htm
  command('#SingleInstance', signature([ keywordOnly([ 'Force', 'Ignore', 'Prompt', 'Off' ]) ])),

  // https://www.autohotkey.com/docs/v2/lib/_SuspendExempt.htm
  command('#SuspendExempt', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v2/lib/_UseHook.htm
  command('#UseHook', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v2/lib/_Warn.htm
  command('#Warn', signature([
    keywordOnly([ 'VarUnset', 'LocalSameAsGlobal', 'Unreachable', 'All' ]),
    keywordOnly([ 'MsgBox', 'StdOut', 'OutputDebug', 'Off' ]),
  ])),

  // https://www.autohotkey.com/docs/v2/lib/_WinActivateForce.htm
  command('#WinActivateForce', signature([])),
];
// #endregion commands

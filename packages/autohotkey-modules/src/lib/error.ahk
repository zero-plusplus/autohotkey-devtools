#Requires AutoHotkey v2.1-

/**
 * Outputs the call stack of the error object specified in the standard error output in a Java-like format.
 *
 * ```
 * Error: error message
 *   > Specifically: extra message
 *     at funcName (path/to/lib/module.ahk:15)
 *     at Auto-execute (path/to/main.ahk:1)
 * ```
 * ```
 * Error: error message
 *   > Specifically: extra message
 *     at funcName (path/to/lib/module.ahk:15)
 *     ... 10 more
 * ```
 * @param {Error} err
 */
export writeError(err) {
  if (!(err is Error)) {
    throw Error('parameter #1 of ' A_ThisFunc ' requires Error, but received the ' Type(err))
  }

  FileAppend(err.__CLASS ': ' err.message '`n', '**')

  if (err.extra !== '') {
    FileAppend('  > Specifically: ' err.extra '`n', '**')
  }

  ; [About stack format](https://www.autohotkey.com/docs/v2/lib/Error.htm#Stack)
  threadFilePath := ''
  for (i, line in StrSplit(err.stack, '`r`n')) {
    ; File (Line) : [What] SourceCode`r`n
    RegExMatch(line, 'i)^(?<path>.+)\s+\((?<line>\d+)\)\s+:\s+\[(?<name>.*)\]', &fileLineWhatMatch)
    if (fileLineWhatMatch) {
      message := Format('    at {} ({}:{})`n', fileLineWhatMatch['name'] || '<anonymous>', fileLineWhatMatch['path'], fileLineWhatMatch['line'])
      FileAppend(message, '**')

      threadFilePath := fileLineWhatMatch['path']
      continue
    }

    ; > What`r`n
    RegExMatch(line, 'i)^>\s+(?<threadName>.+)', &whatMatch)
    if (whatMatch) {
      if (whatMatch['threadName'] == 'Auto-execute') {
        message := Format('    at {} ({})`n', whatMatch['threadName'], A_ScriptFullPath)
        FileAppend(message, '**')
        continue
      }

      message := Format('    at {} ({})`n', whatMatch['threadName'], threadFilePath)
      FileAppend(message, '**')
      continue
    }

    ; ... N more
    if (line ~= '^\.\.\.') {
      message := Format('    {}', line)
      FileAppend(message, '**')
      continue
    }
  }
}

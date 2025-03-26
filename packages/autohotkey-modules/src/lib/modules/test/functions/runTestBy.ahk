#Requires AutoHotkey v2.1-
#Warn All, StdOut

import './lib/modules/test/inner' { CONTEXT }

/**
 * @param {(context: TestContext) => void} callback
 */
export runTestBy(callback) {
  callback(CONTEXT)
}

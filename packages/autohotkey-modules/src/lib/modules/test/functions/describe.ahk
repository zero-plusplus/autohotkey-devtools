#Requires AutoHotkey v2.1-
#Warn All, StdOut

import './lib/modules/test/inner' { addTestSuite }

/**
 * Add a test suite to the current context.
 * @function
 * @param {string} description
 * @param {() => void} callback
 */
export class describe {
  static call(description, callback) {
    addTestSuite(description, callback)
  }
}

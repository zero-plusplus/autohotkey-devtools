#Requires AutoHotkey v2.1-
#Warn All, StdOut

import './lib/modules/test/inner' { addFixture }

/**
 * Add a fixture to be executed before each test case in the current context.
 * @function
 * @param {string} description
 * @param {() => void} callback
 */
export class beforeEach {
  static call(description, callback) {
    addFixture('beforeEach', callback)
  }
}

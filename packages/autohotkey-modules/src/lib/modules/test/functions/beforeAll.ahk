#Requires AutoHotkey v2.1-
#Warn All, StdOut

import './lib/modules/test/inner' { addFixture }

/**
 * Add a fixture to be executed before each test suite in the current context.
 * @function
 * @param {string} description
 * @param {() => void} callback
 */
export class beforeAll {
  static call(description, callback) {
    addFixture('beforeAll', callback)
  }
}

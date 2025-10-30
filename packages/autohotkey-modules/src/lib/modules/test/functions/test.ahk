#Requires AutoHotkey v2.1-
#Warn All, StdOut

import './lib/modules/test/inner' { addTestCase }

/**
 * Add a test case to the current context.
 * @function
 * @param {string} description
 * @param {() => void} callback
 */
export class test {
  static call(description, callback) {
    addTestCase(description, callback)
  }
  /**
   * Add a test cases with parameters to the current context.
   * @param {unknown[]} testParameters
   * @return {(description: string, callback: () => void) => void}
   */
  static each(testParameters) {
    return (description, callback) {
      for (i, params in testParameters) {
        addTestCase('#' i ':' description, callback.bind(params*))
      }
    }
  }
}

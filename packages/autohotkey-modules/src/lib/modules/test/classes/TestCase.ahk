#Requires AutoHotkey v2.1-
#Warn All, StdOut

import './lib/modules/test/inner' { CONTEXT }

export class TestCase extends Array {
  /**
   * @param {string} description
   * @param {() => void} callback
   */
  __NEW(description, callback) {
    /**
     * @readonly
     * @property {string} description
     */
    this.defineProp('description', { get: (*) => description })
    /**
     * @readonly
     * @property {() => void} callback
     */
    this.defineProp('callback', { get: (*) => callback })
    /**
     * @readonly
     * @property {boolean} result
     */
    this.defineProp('result', {
      get: (*) {
        if (this.length == 0) {
          return false
        }

        for i, assertion in this {
          if (assertion.result) {
            continue
          }
          return false
        }
        return true
      }
    })
  }
  call() {
    CONTEXT.currentTestCase := this
    this.callback.call()
    CONTEXT.currentTestCase := ""
  }
}

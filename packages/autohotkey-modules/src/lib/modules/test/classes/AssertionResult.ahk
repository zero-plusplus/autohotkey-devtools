#Requires AutoHotkey v2.1-
#Warn All, StdOut

export class AssertionResult extends Error {
  /**
   * @param {unknown} actual
   * @param {unknown} expected
   * @param {boolean} result
   * @param {Error} err
   */
  __NEW(actual, expected, result, err) {
    /**
     * @readonly
     * @property {unknown} actual
     */
    this.defineProp('actual', { get: (*) => actual })
    /**
     * @readonly
     * @property {unknown} expected
     */
    this.defineProp('expected', { get: (*) => expected })
    /**
     * @readonly
     * @property {boolean} result
     */
    this.defineProp('result', { get: (*) => result })
    /**
     * @readonly
     * @property {string} message
     */
    this.defineProp('message', { get: (*) => err.message })
    /**
     * @readonly
     * @property {string} what
     */
    this.defineProp('what', { get: (*) => err.what })
    /**
     * @readonly
     * @property {string} extra
     */
    this.defineProp('extra', { get: (*) => err.extra })
    /**
     * @readonly
     * @property {number} line
     */
    this.defineProp('line', { get: (*) => err.line })
    /**
     * @readonly
     * @property {string} stack
     */
    this.defineProp('stack', { get: (*) => err.stack })
  }
}

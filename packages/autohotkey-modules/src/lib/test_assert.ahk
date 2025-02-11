#Requires AutoHotkey v2.1-
#Warn All, StdOut

export class Assert {
  ; #region initialize
  static __NEW() {
    this.defineProp('not', { get: (*) => Assert.__NegativeAssert })
  }
  /**
   * @param {string} message
   */
  __NEW(message) {
    /**
     * @property {string} message
     */
    this.defineProp('message', { get: (*) => message })
    /**
     * @property {Assert} not
     */
    this.defineProp('not', { get: (*) => Assert.__NegativeAssert })
  }
  ; #endregion initialize

  ; #region assertions
  /**
   * @instance
   * @static
   * @param {unknown} actual
   * @param {unknown} expected
   * @throws {Error}
   * @return {AssertionResult}
   */
  static equals := (self, actual, expected, message?) {
    result := actual == expected
    if (result) {
      return AssertionResult(actual, expected, result, message)
    }
    throw Error(message ?? 'The given values are not identical.')
  }
  equals := (self, actual, expected) => Assert.equals(actual, expected, this.message)
  /**
   * @instance
   * @static
   * @param {unknown} actual
   * @param {unknown} expected
   * @throws {Error}
   * @return {AssertionResult}
   */
  static equalsIgnoreCase := (self, actual, expected, message?) {
    result := actual = expected
    if (result) {
      return AssertionResult(actual, expected, result, message)
    }
    throw Error(message ?? 'The given values are not identical.')
  }
  equalsIgnoreCase := (self, actual, expected) => Assert.equalsIgnoreCase(actual, expected, this.message)
  ; #endregion assertions

  ; #region inner
  /**
   * @inner
   */
  class __NegativeAssert {
    static __CALL(key, params) {
      for (i, assertion in [ Assert, Assert.__extends ]) {
        if (assertion.hasOwnProp(key)) {
          assertion.%key%(params*)
        }
      }
    }
  }
  ; #endregion inner
}
export class AssertionResult {
  /**
   * @param {unknown} actual
   * @param {unknown} expected
   * @param {boolean} result
   * @param {string?} message?
   */
  __NEW(actual, expected, result, message?) {
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
    this.defineProp('message', { get: (*) => message ?? '' })
  }
}
export class AssertionError extends Error {
  /**
   * @param {string} message
   * @param {unknown} actual
   * @param {unknown} expected
   */
  __NEW(message, actual, expected) {
    /**
     * @readonly
     * @property {string} message
     */
    this.defineProp('message', { get: (*) => message })
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
    this.defineProp('result', { get: (*) => false })
  }
}

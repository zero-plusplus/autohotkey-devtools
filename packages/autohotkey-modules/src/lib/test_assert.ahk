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
   * @static
   * @instance
   * @param {unknown} actual
   * @param {unknown} expected
   * @return {AssertionResult}
   * @throws {AssertionResult}
   */
  static equals := (self, actual, expected, message := '') {
    result := actual == expected
    if (result) {
      return AssertionResult(actual, expected, result, Error(message, -4))
    }
    throw AssertionResult(actual, expected, false, Error(message ?? 'The given values are not identical.', -4))
  }
  equals := (self, actual, expected) => Assert.equals(actual, expected, this.message)
  /**
   * @static
   * @instance
   * @param {unknown} actual
   * @param {unknown} expected
   * @return {AssertionResult}
   * @throws {AssertionResult}
   */
  static equalsIgnoreCase := (self, actual, expected, message := '') {
    result := actual = expected
    if (result) {
      return AssertionResult(actual, expected, result, Error(message, -4))
    }
    throw AssertionResult(actual, expected, false, Error(message ?? 'The given values are not identical.', -4))
  }
  equalsIgnoreCase := (self, actual, expected) => Assert.equalsIgnoreCase(actual, expected, this.message)
  /**
   * @static
   * @instance
   * @param {Func} callback
   * @return {AssertionResult}
   * @throws {AssertionResult}
   */
  static throws(callback, message := '') {
    try {
      callback()
    }
    catch {
      return AssertionResult(true, true, true, Error(message, -4))
    }
    throw AssertionResult(false, true, false, Error(message ?? 'no exceptions were raised', -4))
  }
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

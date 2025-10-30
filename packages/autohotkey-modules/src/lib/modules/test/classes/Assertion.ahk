#Requires AutoHotkey v2.1-
#Warn All, StdOut

import './lib/modules/predicate/functions/equals' { equals }
import './lib/modules/test/classes/AssertionResult' { AssertionResult }

export class Assertion {
  ; #region initialize
  static __NEW() {
    this.defineProp('not', { get: (*) => __NegativeAssert })
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
     * @property {Assertion} not
     */
    this.defineProp('not', { get: (*) => __NegativeAssert })
  }
  ; #endregion initialize

  ; #region assertions
  /**
   * @static
   * @instance
   * @param {unknown} actual
   * @param {unknown} expected
   * @param {string} message?
   * @return {AssertionResult}
   * @throws {AssertionResult}
   */
  static equals := (self, actual, expected, message := '') {
    result := equals(actual, expected)
    if (result) {
      return AssertionResult(actual, expected, result, Error(message, -4))
    }
    throw AssertionResult(actual, expected, false, Error(message || 'The given values are not identical.', -4))
  }
  equals := (self, actual, expected) => Assertion.equals(actual, expected, this.message)
  /**
   * @static
   * @instance
   * @param {unknown} actual
   * @param {unknown} expected
   * @param {string} message?
   * @return {AssertionResult}
   * @throws {AssertionResult}
   */
  static equalsIgnoreCase := (self, actual, expected, message := '') {
    result := actual = expected
    if (result) {
      return AssertionResult(actual, expected, result, Error(message, -4))
    }
    throw AssertionResult(actual, expected, false, Error(message || 'The given values are not identical.', -4))
  }
  equalsIgnoreCase := (self, actual, expected) => Assertion.equalsIgnoreCase(actual, expected, this.message)
  /**
   * @static
   * @instance
   * @param {unknown} actual
   * @param {string} message?
   * @return {AssertionResult}
   * @throws {AssertionResult}
   */
  static isTruthy(actual, message := '') {
    expected := true

    result := (!!actual) == expected
    if (result) {
      return AssertionResult(actual, expected, result, Error(message, -4))
    }
    throw AssertionResult(actual, expected, false, Error(message || 'The given value is not a truthy.', -4))
  }
  isTruthy := (self, actual) => Assertion.isTruthy(actual, this.message)
  /**
   * @static
   * @instance
   * @param {unknown} actual
   * @param {string} message?
   * @return {AssertionResult}
   * @throws {AssertionResult}
   */
  static isFalsy(actual, message := '') {
    expected := false

    result := (!!actual) == expected
    if (result) {
      return AssertionResult(actual, expected, result, Error(message, -4))
    }
    throw AssertionResult(actual, expected, false, Error(message || 'The given value is not a falsy.', -4))
  }
  isFalsy := (self, actual) => Assertion.isFalsy(actual, this.message)
  /**
   * @static
   * @instance
   * @param {Func} callback
   * @param {string} message?
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
    throw AssertionResult(false, true, false, Error(message || 'no exceptions were raised', -4))
  }
  throws := (self, callback) => Assertion.throws(callback, this.message)
  /**
   * @static
   * @instance
   * @param {string} message?
   * @return {AssertionResult}
   */
  static pass(message := '') {
    return AssertionResult(true, true, true, Error(message || 'assertion succeeds', -4))
  }
  pass := (self) => Assertion.pass(this.message)
  /**
   * @static
   * @instance
   * @param {string} message?
   * @throws {AssertionResult}
   */
  static fail(message := '') {
    throw AssertionResult(false, false, false, Error(message || 'assertion fails', -4))
  }
  fail := (self) => Assertion.fail(this.message)
  ; #endregion assertions
}

; #region helpers
/**
 * @inner
 */
class __NegativeAssert {
  static __CALL(key, params) {
    for (i, assert in [ Assertion, Assertion.__extends ]) {
      if (assert.hasOwnProp(key)) {
        assert.%key%(params*)
      }
    }
  }
}
; #endregion helpers

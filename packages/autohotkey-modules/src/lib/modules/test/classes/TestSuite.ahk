#Requires AutoHotkey v2.1-
#Warn All, StdOut

import './lib/modules/function/functions/noop' { noop }

export class TestSuite extends Array {
  /**
   * @param {string} description
   * @param {() => void} callback
   * @param {TestSuite?} parent?
   */
  __NEW(description, callback, parent?) {
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
     * @property {TestSuite?} parent?
     */
    this.defineProp('parent', { get: (*) => parent ?? '' })
    /**
     * @readonly
     * @property {AssertionResult} assertions
     */
    this.defineProp('assertions', {
      get: (*) {
        assertions := []
        for i, testCaseOrTestSuite in this {
          if (testCaseOrTestSuite is TestSuite) {
            assertions.push(testCaseOrTestSuite.assertions*)
            continue
          }
          assertions.push(testCaseOrTestSuite*)
        }
        return assertions
      }
    })
    /**
     * @readonly
     * @property {AssertionResult} successes
     */
    this.defineProp('successes', {
      get: (*) {
        successes := []
        for i, assertion in this.assertions {
          if (assertion.result) {
            successes.push(assertion)
          }
        }
        return successes
      }
    })
    /**
     * @readonly
     * @property {AssertionResult} failures
     */
    this.defineProp('failures', {
      get: (*) {
        failures := []
        for i, assertion in this.assertions {
          if (!assertion.result) {
            failures.push(assertion)
          }
        }
        return failures
      }
    })
    /**
     * @readonly
     * @property {boolean} result
     */
    this.defineProp('result', {
      get: (*) {
        if (this.length == 0) {
          return false
        }

        for i, testCaseOrTestSuite in this {
          if (testCaseOrTestSuite.result) {
            continue
          }
          return false
        }
        return true
      }
    })
    /**
     * @property {TestFixtures} fixtures
     */
    fixtures := {
      beforeAll: noop,
      afterAll: noop,
      beforeEach: noop,
      afterEach: noop,
    }
    this.defineProp('fixtures', { get: (*) => fixtures })
  }
  call() {
    this.fixtures.beforeAll()

    for (i, testCaseOrSuiteInstance in this) {
      this.fixtures.beforeEach()
      testCaseOrSuiteInstance()
      this.fixtures.afterEach()
    }

    this.fixtures.afterAll()
  }
}

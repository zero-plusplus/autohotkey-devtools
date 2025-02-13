#Requires AutoHotkey v2.1-
#Warn All, StdOut

import { Assert as DefaultAssert } from test_assert

/**
 * @inner
 */
noop := (*) => ''

/**
 * @typedef {{
 *   currentTestSuite?: TestSuite
 *   currentTestCase?: TestCase
 * }} TestContext
 *
 * @inner
 * @type {TestContext}
 */
CONTEXT := {
  currentTestSuite: '',
  currentTestCase: '',
}

/**
 * @inner
 * @param {string} description
 * @param {() => void} callback
 */
addTestSuite(description, callback) {
  parent := CONTEXT.currentTestSuite
  CONTEXT.currentTestSuite := TestSuite(description, callback, CONTEXT.currentTestSuite)

  if (parent) {
    parent.push(CONTEXT.currentTestSuite)
  }

  callback()

  if (parent) {
    CONTEXT.currentTestSuite := parent
  }
}
/**
 * @inner
 * @param {string} description
 * @param {() => void} callback
 */
addTestCase(description, callback) {
  CONTEXT.currentTestSuite.push(TestCase(description, callback))
}
/**
 * @typedef {{{
 *   beforeAll: () => void;
 *   afterAll: () => void;
 *   beforeEach: () => void;
 *   afterEach: () => void;
 * }} TestFixture
 */
/**
 * @inner
 * @param {
 * | 'beforeAll'
 * | 'afterAll'
 * | 'beforeEach'
 * | 'afterEach'
 * } fixtureName
 * @param {() => void} callback
 */
addFixture(fixtureName, callback) {
  CONTEXT.currentTestSuite.fixtures[fixtureName] := callback
}

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
/**
 * Add a fixture to be executed after each test suite in the current context.
 * @function
 * @param {string} description
 * @param {() => void} callback
 */
export class afterAll {
  static call(description, callback) {
    addFixture('afterAll', callback)
  }
}
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
/**
 * Add a fixture to be executed after each test case in the current context.
 * @function
 * @param {string} description
 * @param {() => void} callback
 */
export class afterEach {
  static call(description, callback) {
    addFixture('afterEach', callback)
  }
}

/**
 * @inner
 */
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

/**
 * @typedef {{
 *   report: () => void;
 * }} TestConfig
 *
 * @param {TestConfig} config
 */
export runAllTest(config?) {
  CONTEXT.currentTestSuite.call()

  reporter := config?.report ?? reportTestSuite
  reporter(CONTEXT.currentTestSuite)
}
/**
 * @param {(context: TestContext) => void} callback
 */
export runTestBy(callback) {
  callback(CONTEXT)
}
/**
 * @param {TestSuite} testSuiteInstance
 * @param {string} [indent := '']
 */
export reportTestSuite(testSuiteInstance, indent := '') {
  mark := testSuiteInstance.result ? '✅' : '❌'
  FileAppend(indent '[' mark '] ' testSuiteInstance.description '`n', '*')

  indent := indent == '' ? '  ' : (indent indent)
  for i, testCaseOrSuite in testSuiteInstance {
    if (testCaseOrSuite is TestSuite) {
      reportTestSuite(testCaseOrSuite, indent)
      continue
    }
    reportTestCase(testCaseOrSuite, indent)
  }
}
/**
 * @param {TestSuite} testSuiteInstance
 * @param {string} [indent := '']
 */
export reportTestCase(testCaseInstance, indent) {
  mark := testCaseInstance.result ? '✅' : '❌'
  FileAppend(indent '[' mark '] ' testCaseInstance.description '`n', '*')
  for i, assertion in testCaseInstance {
    mark := assertion.result ? '✅' : '❌'
    FileAppend((indent '  ') '[' mark '] ' assertion.message '`n', '*')
  }
}

export class assert {
  __NEW(message) {
    this.defineProp('negative', { get: (*) => false })
    this.defineProp('message', { get: (*) => message })
    this.defineProp('not', { get: (*) => assert.__Negative(message) })
  }
  static __NEW() {
    this.use(DefaultAssert)
    this.defineProp('not', { get: (*) => assert.__Negative })
  }
  static use(behavior) {
    this.defineProp('behavior', { get: (*) => behavior })
  }
  static __CALL(key, params) {
    behavior := this.behavior.%key%
    try {
      result := behavior(this.behavior, params*)
      CONTEXT.currentTestCase.push(result)
    }
    catch (Error as err) {
      CONTEXT.currentTestCase.push({
        result: false,
        actual: params[1],
        expected: params[2],
        message: params.length == 3 ? params[3] : err.message,
      })
    }
  }
  __CALL(key, params) {
    params.push(this.message)
    return assert.__CALL(key, params)
  }
  class __Negative {
    __NEW(message) {
      this.defineProp('message', { get: (*) => message })
    }
    static __CALL(key, params) {
      behavior := assert.behavior.%key%
      try {
        result := behavior(assert.behavior, params*)
        result.defineProp('result', { get: (*) => false })
        CONTEXT.currentTestCase.push(result)
      }
      catch (Error as err) {
        CONTEXT.currentTestCase.push({
          result: true,
          actual: params[1],
          expected: params[2],
          message: params.length == 3 ? params[3] : err.message,
        })
      }
    }
    __CALL(key, params) {
      params.push(this.message)
      return assert.__Negative.__CALL(key, params)
    }
  }
}

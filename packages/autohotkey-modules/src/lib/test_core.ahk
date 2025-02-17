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

  if (CONTEXT.currentTestSuite.result) {
    ExitApp 0
  }
  ExitApp 1
}
/**
 * @param {(context: TestContext) => void} callback
 */
export runTestBy(callback) {
  callback(CONTEXT)
}
/**
 * @typedef {{
 *   indent: string;
 *   filter: (test: TestSuite | TestCase | AssertionResult) => boolean;
 *   checkmark: (test: TestSuite | TestCase | AssertionResult) => string;
 *   onError: (assertion: AssertionResult, reportConfig: ReportConfig) => boolean;
 * }} ReportConfig
 */
defaultReportConfig := {
  indent: '',
  filter: (*) => true,
  checkmark: (test) => test.result ? '[✅] ' : '[❌] ',
  onError: (*) {
  },
}
/**
 * @param {TestSuite} testSuiteInstance
 */
export reportSummary(testSuiteInstance, reportConfig := defaultReportConfig) {
  summary := testSuiteInstance.result
    ? Chr(0x001b) '[37m' Chr(0x001b) '[42mPASS'
    : Chr(0x001b) '[37m' Chr(0x001b) '[41mFAIL'
  summary .= Chr(0x001b) '[0m'
  summary .= ': ' testSuiteInstance.description
  summary .= ' ' testSuiteInstance.successes.length '/' testSuiteInstance.assertions.length
  FileAppend(summary '`n', '*')

  reportTestSuite(testSuiteInstance, reportConfig)
}
/**
 * @param {TestSuite} testSuiteInstance
 * @param {ReportConfig} reportConfig?
 */
export reportTestSuite(testSuiteInstance, reportConfig := defaultReportConfig) {
  indent := reportConfig.indent ?? defaultReportConfig.indent
  showTest := (reportConfig.filter ?? defaultReportConfig.filter).call(testSuiteInstance)
  if (!showTest) {
    return
  }

  mark := (reportConfig.checkmark ?? defaultReportConfig.checkmark).call(testSuiteInstance)
  FileAppend(indent mark testSuiteInstance.description '`n', '*')

  reportConfig.indent := indent == '' ? '  ' : (indent '  ')
  for i, testCaseOrSuite in testSuiteInstance {
    if (testCaseOrSuite is TestSuite) {
      reportTestSuite(testCaseOrSuite, reportConfig)
      continue
    }
    reportTestCase(testCaseOrSuite, reportConfig)
  }
}
/**
 * @param {TestCase} testCaseInstance
 * @param {ReportConfig} reportConfig?
 */
export reportTestCase(testCaseInstance, reportConfig := defaultReportConfig) {
  indent := reportConfig.indent ?? defaultReportConfig.indent
  showTest := (reportConfig.filter ?? defaultReportConfig.filter).call(testCaseInstance)
  if (!showTest) {
    return
  }

  mark := (reportConfig.checkmark ?? defaultReportConfig.checkmark).call(testCaseInstance)
  FileAppend(indent mark testCaseInstance.description '`n', '*')

  reportAssertions(testCaseInstance, reportConfig)
}
/**
 * @param {AssertionResult[]} assertions
 * @param {ReportConfig} reportConfig?
 */
export reportAssertions(assertions, reportConfig := defaultReportConfig) {
  indent := reportConfig.indent ?? defaultReportConfig.indent

  for i, assertion in assertions {
    showTest := (reportConfig.filter ?? defaultReportConfig.filter).call(assertion)
    if (!showTest) {
      continue
    }

    mark := (reportConfig.checkmark ?? defaultReportConfig.checkmark).call(assertion)
    FileAppend((indent '  ') mark assertion.message '`n', '*')
    (reportConfig.onError ?? defaultReportConfig.onError).call(assertion, reportConfig)
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
      CONTEXT.currentTestCase.push(err)
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
        err.defineProp('result', { get: (*) => true })
        CONTEXT.currentTestCase.push(err)
      }
    }
    __CALL(key, params) {
      params.push(this.message)
      return assert.__Negative.__CALL(key, params)
    }
  }
}

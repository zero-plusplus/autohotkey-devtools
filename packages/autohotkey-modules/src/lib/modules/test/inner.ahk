#Requires AutoHotkey v2.1-

import './lib/modules/test/classes/TestCase' { TestCase }
import './lib/modules/test/classes/TestSuite' { TestSuite }

/**
 * @typedef {{
 *   currentTestSuite?: TestSuite
 *   currentTestCase?: TestCase
 * }} TestContext
 *
 * @inner
 * @type {TestContext}
 */
export CONTEXT := {
  currentTestSuite: '',
  currentTestCase: '',
}

/**
 * @typedef {{
 *   indent: string;
 *   filter: (test: TestSuite | TestCase | AssertionResult) => boolean;
 *   checkmark: (test: TestSuite | TestCase | AssertionResult) => string;
 *   onError: (assertion: AssertionResult, reportConfig: ReportConfig) => boolean;
 * }} ReportConfig
 */
export defaultReportConfig := {
  indent: '',
  filter: (*) => true,
  checkmark: (test) => test.result ? '[✅] ' : '[❌] ',
  onError: (*) {
  },
}

/**
 * @inner
 * @param {string} description
 * @param {() => void} callback
 */
export addTestSuite(description, callback) {
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
export addTestCase(description, callback) {
  CONTEXT.currentTestSuite.push(TestCase(description, callback))
}
/**
 * @typedef {{
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
export addFixture(fixtureName, callback) {
  CONTEXT.currentTestSuite.fixtures[fixtureName] := callback
}

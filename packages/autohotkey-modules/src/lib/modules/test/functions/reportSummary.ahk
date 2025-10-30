#Requires AutoHotkey v2.1-
#Warn All, StdOut

import './lib/modules/test' { reportTestSuite }
import './lib/modules/test/inner' { defaultReportConfig }

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

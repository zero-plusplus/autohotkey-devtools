#Requires AutoHotkey v2.1-
#Warn All, StdOut

import './lib/modules/test/classes/TestSuite' { TestSuite }
import './lib/modules/test/functions/reportTestCase' { reportTestCase }
import './lib/modules/test/inner' { defaultReportConfig }

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

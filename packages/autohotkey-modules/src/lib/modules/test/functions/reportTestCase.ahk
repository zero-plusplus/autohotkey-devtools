#Requires AutoHotkey v2.1-
#Warn All, StdOut

import './lib/modules/test/functions/reportAssertions' { reportAssertions }
import './lib/modules/test/inner' { defaultReportConfig }

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

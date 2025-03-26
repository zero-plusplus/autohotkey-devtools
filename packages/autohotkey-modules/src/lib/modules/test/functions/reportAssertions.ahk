#Requires AutoHotkey v2.1-
#Warn All, StdOut

import './lib/modules/test/inner' { defaultReportConfig }

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

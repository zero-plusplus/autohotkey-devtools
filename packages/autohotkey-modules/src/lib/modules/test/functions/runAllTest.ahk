#Requires AutoHotkey v2.1-
#Warn All, StdOut

import './lib/modules/test/functions/reportTestSuite' { reportTestSuite }
import './lib/modules/test/inner' { CONTEXT }

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

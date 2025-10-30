#Requires AutoHotkey v2.1-
#Warn All, StdOut

import './lib/modules/test' { * }
import './lib/modules/error' { writeError }

SetTimer(() {
  runAllTest({
    report: (rootTestSuite) {
      reportSummary(rootTestSuite, {
        indent: '  ',
        filter: (test) => test.result == false,
        checkmark: (test) => test.result ? '[✔] ' : '[✘] ',
        onError: (assertion, reportConfig) {
          writeError(assertion)
        }
      })
    }
  })
}, -1)

#Requires AutoHotkey v2.1-
#Warn All, StdOut

import * from test
import { callback } from function_callback

describe('function', () {
  describe('callback', () {
    test('callback', () {
      testCallback := (a, b, c) => ''

      assert('Pass fewer parameters than the number of parameters').throws(() {
        testCallback('')
      })
      assert('Pass more parameters than the number of parameters').throws(() {
        testCallback('', '', '', '')
      })
      assert('Wrapped callback will not raise an exception regardless of the number of parameters').not.throws(() {
        callback(testCallback)('')
        callback(testCallback)('', '', '', '')
      })
    })
  })
})

runAllTest()

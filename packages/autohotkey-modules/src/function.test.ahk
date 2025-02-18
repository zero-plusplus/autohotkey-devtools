#Requires AutoHotkey v2.1-
#Warn All, StdOut

#Include ./.config.ahk

import { callback, callAsCallback } from function_callback

describe('function', () {
  describe('callback / callAsCallback', () {
    test('callback / callAsCallback', () {
      testCallback := (a, b, c) => ''

      assert('Pass fewer parameters than the number of parameters').throws(() {
        testCallback('')
      })
      assert('Pass more parameters than the number of parameters').throws(() {
        testCallback('', '', '', '')
      })
      assert('Wrapped callback will not raise an exception regardless of the number of parameters').not.throws(() {
        callback(testCallback)('')
        callAsCallback(testCallback, [ '' ])

        callback(testCallback)('', '', '', '')
        callAsCallback(testCallback, [ '', '', '', '' ])

        callback(T.method, T)('', '', '', '')
        callAsCallback(T.method, [ '', '', '', '' ], T)
      })
    })
  })
})

class T {
  static method(a, b, c) {
  }
}

#Requires AutoHotkey v2.1-
#Warn All, StdOut

#Include ./.config.ahk

import './lib/modules/function' {
  CallbackFunc,
  invokeCallback,
}

describe('function', () {
  test('CallbackFunc / invokeCallback', () {
    callback := (a, b, c) => ''

    assert('Pass fewer parameters than the number of parameters').throws(() {
      callback('')
    })
    assert('Pass more parameters than the number of parameters').throws(() {
      callback('', '', '', '')
    })
    assert('Wrapped callback will not raise an exception regardless of the number of parameters').not.throws(() {
      CallbackFunc(callback)('')
      invokeCallback(callback, [ '' ])

      CallbackFunc(callback)('', '', '', '')
      invokeCallback(callback, [ '', '', '', '' ])

      CallbackFunc(T.method, T)('', '', '', '')
      invokeCallback(T.method, [ '', '', '', '' ], T)
    })
  })
})

class T {
  static method(a, b, c) {
  }
}

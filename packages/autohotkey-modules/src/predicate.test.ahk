#Requires AutoHotkey v2.1-
#Warn All, StdOut

#Include ./.config.ahk

import './lib/modules/predicate' { equals }

describe('predicate', () {
  test('equals', () {
    assert('Comparison of string').equals(equals('abc', 'abc'), true)
    assert('Comparison of string').equals(equals('123', '123'), true)

    obj := { key: '123' }
    assert('Comparison of identical object').equals(equals(obj, obj), true)

    assert('Comparison of shallow object').equals(equals(
      { key: '123' },
      { key: '123' }
    ), true)

    assert('Comparison of different shallow objects with identical content').equals(equals(
      { key: '123' },
      Map('key', '123')
    ), true)

    deepObj := { key: 123 }
    assert('Comparison of deep object').equals(equals(
      { key: '123', deep: deepObj },
      { key: '123', deep: deepObj }
    ), true)
    assert('Comparison of deep object').equals(equals(
      { key: '123', deep: { key: 123 } },
      { key: '123', deep: { key: 123 } }
    ), false)
  })
})

#Requires AutoHotkey v2.1-
#Warn All, StdOut

import * from test_index
import { at, each } from collection

describe('collection', () {
  describe('at', () {
    test('object', () {
      obj := { key: 'value', nest: { key: 'value' } }

      assert('obj.key').equals(obj.key, at(obj, 'key'))
      assert('obj.nest.key').equals(obj.nest.key, at(obj, [ 'nest', 'key' ]))
      assert('obj.unknown').equals('', at(obj, 'unknown', ''))
    })
    test('array', () {
      obj := [ 'a', [ 'b' ] ]

      assert('obj[1]').equals(obj[1], at(obj, 1))
      assert('obj[2][1]').equals(obj[2][1], at(obj, [ 2, 1 ]))
      assert('obj["unknown"]').equals('', at(obj, 'unknown', ''))
    })
    test('map', () {
      obj := Map('key', 'value', 'nest', Map('key', 'value'))

      assert('obj["key"]').equals(obj['key'], at(obj, 'key'))
      assert('obj["nest"]["key"]').equals(obj['nest']['key'], at(obj, [ 'nest', 'key' ]))
      assert('obj["unknown"]').equals('', at(obj, 'unknown', ''))
    })
  })

  describe('each', () {
    test.each([
      [ { key: 'value' } ],
      [ [ 1, 2, 3 ], ],
      [ Map('key', 'value') ],
    ])('Enumerator returns as given', (obj) {
      e := each(obj)
      assert.equals(e, each(e))
    })

    test('Enumeration does not include inherited members', () {
      obj := { fieldA: 'valueA', base: { fieldB: 'valueB' } }

      e := each(obj)
      e(&key, &value)
      assert('fieldA is enumerated').equals(value, at(obj, key))
      assert('Inherited fieldB is not enumerated').equals(e(&key, &value), false)
    })

    test.each([
      [ { key: 'value' } ],
      [ [ 1, 2, 3 ], ],
      [ Map('key', 'value') ],
    ])('Enumeration with callback', (obj) {
      each(obj, (value, key) {
        assert('key: "' key '"').equals(value, at(obj, key))
      })
    })

    test.each([
      [ { key: 'value' } ],
      [ [ 1, 2, 3 ], ],
      [ Map('key', 'value') ],
    ])('Enumeration with enumerator', (obj) {
      for (key, value in each(obj)) {
        assert('key: "' key '"').equals(value, at(obj, key))
      }
    })
  })
})

runAllTest()

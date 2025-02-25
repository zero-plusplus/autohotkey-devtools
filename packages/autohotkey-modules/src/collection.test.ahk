#Requires AutoHotkey v2.1-
#Warn All, StdOut

#Include ./.config.ahk

import { at, count, each, Enumerable, Stack, Queue, UniqueArray, CircularInfomation } from collection

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

  describe('count', () {
    test.each([
      [ { field1: 'value1', field2: 'value2', field3: 'value3' }, 3 ],
      [ [ 1, 2, 3 ], 3 ],
      [ Map('field1', 'value1', 'field2', 'value2', 'field3', 'value3'), 3 ],
    ])('Get a number of members/elements', (obj, expectedCount) {
      assert.equals(count(obj), expectedCount)
    })

    test('Inherited members are not counted', () {
      obj := { fieldA: 'valueA', base: { fieldB: 'valueB' } }
      assert.equals(count(obj), 1)
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

      e := each(obj).__ENUM()
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
  describe('Enumerable', () {
    test.each([
      [ { key1: 'value1', key2: 'value2' } ],
      [ Map('key1', 'value1', 'key2', 'value2' ) ],
      [ Array('key1', 'value1', 'key2', 'value2' ) ],
    ])('flatEntries', (obj) {
      for (i, constractor in [ each, Enumerable ]) {
        m := Map(constractor(obj).flatEntries()*)

        assert('key1').equals('value1', m['key1'])
        assert('key2').equals('value2', m['key2'])
      }
    })

    test.each([
      [ { key1: 5, key2: 10 } ],
      [ Map('key1', 5, 'key2', 10 ) ],
    ])('keys', (obj) {
      keys := Array(Enumerable(obj).keys()*)
      assert.equals(keys[1], 'key1')
      assert.equals(keys[2], 'key2')
    })

    test.each([
      [ { key1: 5, key2: 10 } ],
      [ Map('key1', 5, 'key2', 10 ) ],
    ])('map', (obj) {
      e := Enumerable(obj)
        .map((value, key, _obj) {
          assert.equals(obj, _obj)
          return value * 2
        })
        .flatEntries()

      m := Map(e*)
      assert.equals(m['key1'], at(obj, 'key1') * 2)
      assert.equals(m['key2'], at(obj, 'key2') * 2)
    })
  })

  describe('traverse', () {
    test.each([
      [ { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4', key5: 'value5' }, 5 ],
      [ [ 1, 2, 3, 4, 5 ], 5],
    ])('flat', (obj, expectedCount) {
      actualCount := 0
      for key, value, source in each(obj).traverse() {
        actualCount++
      }
      assert.equals(actualCount, expectedCount)
    })

    test.each([
      [ { key1: 'value1', nest: { key2: 'value2', nest2: { key3: 'value3', nest3: { key4: 'value4' } } }, key5: 'value5' }, 5 + 3 ],
      [ [ 1, 2, 3, [ 4, 5, 6, [ 7, 8, 9 ] ] ], 9 + 2  ],
    ])('nest', (obj, expectedCount) {
      actualCount := 0
      for key, value, context in each(obj).traverse() {
        actualCount++
      }
      assert.equals(actualCount, expectedCount)
    })

    test('circular', () {
      circular := {}
      circular.circular := circular

      for key, value in each(circular).traverse() {
        if (value is CircularInfomation) {
          assert.equals(circular, value.value)
          return
        }
      }
      assert.fail()
    })
  })

  describe('Stack', () {
    test('methods', () {
      q := Stack('a', 'b')

      assert('count').equals(q.count, 2)
      assert('peek').equals(q.peek(), 'b')
      assert('pop').equals(q.pop(), 'b')
      assert('isEmpty').equals(q.isEmpty(), false)
      assert('pop').equals(q.pop(), 'a')
      assert('isEmpty').equals(q.isEmpty(), true)

      q.push('c')
      assert('push->isEmpty').equals(q.isEmpty(), false)
    })

    test('enumerator', () {
      e := each(Stack('a', 'b')).__ENUM()

      e(&key, &value)
      assert('[' key ']: ' value).equals(value, 'b')

      e(&key, &value)
      assert('[' key ']: ' value).equals(value, 'a')
    })
  })
  describe('Queue', () {
    test('methods', () {
      q := Queue('a', 'b')

      assert('count').equals(q.count, 2)
      assert('peek').equals(q.peek(), 'a')
      assert('dequeue').equals(q.dequeue(), 'a')
      assert('isEmpty').equals(q.isEmpty(), false)
      assert('dequeue').equals(q.dequeue(), 'b')
      assert('isEmpty').equals(q.isEmpty(), true)

      q.enqueue('c')
      assert('enqueue->isEmpty').equals(q.isEmpty(), false)
    })

    test('enumerator', () {
      e := each(Queue('a', 'b')).__ENUM()

      e(&key, &value)
      assert('[' key ']: ' value).equals(value, 'a')

      e(&key, &value)
      assert('[' key ']: ' value).equals(value, 'b')
    })
  })
  describe('UniqueArray', () {
    test('methods', () {
      a := UniqueArray(1, 1, 2, 3, 3)
      assert('length').equals(a.length, 3)
      assert('push').equals(a.push(1, 1, 4), 1)
      assert('pop').equals(a.pop(), 4)
      assert('length').equals(a.length, 3)

      b := a.clone()
      assert('clone').isTruthy(b is UniqueArray)
      assert('hasValue').isTruthy(a.hasValue(b[1]))
      assert('length').equals(a.length, b.length)

      b[1] := 3
      assert('assign').equals(b[1], 1)

      b[1] := 5
      assert('assign').equals(b[1], 5)
    })
  })
})

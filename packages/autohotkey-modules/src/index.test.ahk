#Requires AutoHotkey v2.1-
#Warn All, StdOut

import * from test

describe('describe', () {
  test('test', () {
    assert.equals('a', 'a', '"a" == "a"')
    assert.not.equals('a', 'b', '"a" !== "b"')

    assert('"a" == "a"').equals('a', 'a')
    assert('"a" !== "b"').not.equals('a', 'b')
  })
  describe('describe2', () {
    test('test2', () {
      assert.equals('a', 'a', '"a" == "a"')
      assert.not.equals('a', 'b', '"a" !== "b"')

      assert('"a" == "a"').equals('a', 'a')
      assert('"a" !== "b"').not.equals('a', 'b')
    })
    describe('describe3', () {
      test('test3', () {
        assert.equals('a', 'a', '"a" == "a"')
        assert.not.equals('a', 'b', '"a" !== "b"')

        assert('"a" == "a"').equals('a', 'a')
        assert('"a" !== "b"').not.equals('a', 'b')
      })
    })
  })
})

runAllTest()

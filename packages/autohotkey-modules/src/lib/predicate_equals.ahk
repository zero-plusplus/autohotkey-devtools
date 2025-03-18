#Requires AutoHotkey v2.1-
#Warn All, StdOut

import function_callback as f
import { each } from collection

/**
 * Checks if `left` and `right` are equal.
 * @function
 * @param {any} left
 * @param {any} right
 * @return {boolean}
 * @example
 * equals('123', '123') ; => true
 *
 * obj := { key: '123' }
 * equals(obj, obj)     ; => true
 *
 * equals('123', 123)                        ; => true
 * equals({ key: '123' }, { key: '123' })    ; => true
 * equals({ key: '123' }, Map('key', '123')) ; => true
 *
 * ; Nested objects are simply checked using equals.strict
 * equals({ key: '123', deep: { key: 123 } }, { key: '123', deep: { key: 123 } }) ; => false
 * obj := { key: 123 }
 * equals({ key: '123', deep: obj }, { key: '123', deep: obj }) ; => true
 */
export class equals {
  static call(left, right, equiv := f.callback(equals.strict, equals)) {
    if (!IsObject(left) || !IsObject(right)) {
      return equiv(left, right)
    }

    enum_l := each(left)
    enum_r := each(right)

    keys_l := Array(each(left).keys()*)
    keys_r := Array(each(right).keys()*)

    if (keys_l.length !== keys_r.length) {
      return false
    }

    Loop keys_l.length {
      key_l := keys_l[A_Index]
      key_r := keys_r[A_Index]
      if (!equiv(key_l, key_r)) {
        return false
      }

      value_l := enum_l.get(key_l)
      value_r := enum_r.get(key_r)
      if (!equiv(value_l, value_r)) {
        return false
      }
    }
    return true
  }
  /**
   * Checks if `left` and `right` are identical.
   * @static
   * @param {any} left
   * @param {any} right
   * @return {boolean}
   * @example
   * equals.strict('123', '123') ; => true
   * obj := { key: '123' }
   * equals.strict(obj, obj) ; => true
   *
   * equals.strict('123', 123) ; => false
   * equals.strict({ key: '123' }, { key: '123' }) ; => false
   */
  static strict(left, right) {
    return left == right && Type(left) == Type(right)
  }
}

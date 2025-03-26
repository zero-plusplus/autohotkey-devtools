#Requires AutoHotkey v2.1-

import './lib/modules/collection/classes/CircularInfomation' { CircularInfomation }
import './lib/modules/collection/classes/UniqueArray' { UniqueArray }
import './lib/modules/collection/functions/getIn' { getIn }
import './lib/modules/function/classes/CallbackFunc' { CallbackFunc }
import './lib/modules/function/functions/invokeCallback' { invokeCallback }

/**
 * This class is a wrapper with utility methods for enumeration.
 * @template T
 * @param {T} source
 */
export class Enumerable {
  __NEW(source, customEnum := ((params*) => getEnumerator(source, params*))) {
    if (IsSet(parent) && !(parent is Enumerable)) {
      throw Error('parameter #3 must be Enumerable.')
    }

    if (source is Enumerable) {
      return source
    }

    /**
     * @readonly
     * @property {object} __source
     */
    this.defineProp('__source', { get: (*) => source })
    /**
     * @readonly
     * @property {Enumerable}
     */
    this.defineProp('__CUSTOMENUM', { get: (*) => customEnum })
    /**
     * @readonly
     * @property {Enumerable}
     */
    this.defineProp('__current', { get: (*) => (unset?) })
    this.reset()
  }
  __ENUM(params*) {
    __CUSTOMENUM := this.__CUSTOMENUM
    return __CUSTOMENUM(params*)
  }
  call(&key?, &value?, &self?) {
    self ??= this
    __current := this.__current
    return __current(&key, &value, &self)
  }
  /**
   * @param {unknown[]} keys*
   * @return {unknown}
   */
  get(keys*) {
    return getIn(this.__source, keys)
  }
  /**
   * @param {unknown[]} keys
   * @param {unknown} default?
   * @return {unknown}
   */
  getOrDefault(keys, default?) {
    return getIn(this.__source, keys, default)
  }
  /**
   * @chainable
   */
  reset() {
    current := this.__ENUM()
    this.defineProp('__current', { get: (*) => current })

    return this
  }
  /**
   * @param {() => 1 | 0 | -1}
   * @return {Enumerator<unknown[], unknown>}
   */
  traverse() {
    __stack := UniqueArray(this.__source)
    __self := this
    __parent := []

    return Enumerable(this.__source, (*) => (&keys, &value?, &self?) {
      self ??= __self
      __current := self.__current

      keys := Array((keys ?? [])*)
      keys.push(__parent*)

      hasNext := __current(&key, &value, &self)
      if (!hasNext) {
        __stack.pop()
        if (0 < __parent.length) {
          __parent.pop()
        }
        return false
      }

      if (!IsObject(value)) {
        keys.push(key)
        return true
      }

      if (__stack.hasValue(value)) {
        value := CircularInfomation(value)
        return hasNext
      }

      __stack.push(value)
      __self := Enumerable(value)
      __parent.push(key)
      self := __self
      return true
    })
  }
  /**
   * Returns an Enumerator that enumerates each key.
   * @return {Enumerable<number, string>}
   */
  keys() {
    props := this.__ENUM()

    return Enumerable(this.__source, (*) => (&key?, &value?) {
      hasNext := props(&key, &value)
      if (!hasNext) {
        return false
      }

      value := key
      return true
    })
  }
  /**
   * Returns an Enumerator that converts each enumerated element.
   * @template Key, Result
   * @param {(value: unknown, key: Key, source: T) => Result} callback
   * @return {Enumerable<Key, Result>}
   */
  map(callback) {
    props := this.__ENUM()
    _callback := CallbackFunc(callback)

    return Enumerable(this.__source, (*) => (&key?, &value?) {
      hasNext := props(&key, &value)
      if (hasNext) {
        value := _callback.call(value, key, this.__source)
        return true
      }
      return false
    })
  }
  /**
   * Returns an Enumerator for the Map arguments.
   * @return {Enumerator}
   * @example
   * ;; The following are all synonymous with `Map('key1', 'value1', 'key2', 'value2')`
   * Map(each({ key1: 'value1', key2: 'value2' }).flatEntries()*)
   * Map(each([ 'key1', 'value1', 'key2', 'value2' ]).flatEntries()*)
   * Map(each(Map('key1', 'value1', 'key2', 'value2')).flatEntries()*)
   */
  flatEntries() {
    props := this.__ENUM()
    if (this.__source is Array) {
      return props
    }

    _key := unset
    _value := unset
    __enumerate := (&key?, &value?, *) {
      if (IsSet(_key)) {
        key := _key

        _key := unset
        return true
      }
      else if (IsSet(_value)) {
        key := _value

        _value := unset
        return true
      }

      hasNext := props(&_key, &_value)
      if (hasNext) {
        return __enumerate(&key, &value)
      }
      return false
    }

    return Enumerable(this.__source, (*) => __enumerate)
  }
}

; #region helpers
/**
 * @inner
 * @return {Enumerator}
 */
getEnumerator(obj, params*) {
  if (obj is Enumerable) {
    return obj
  }
  if (obj is Enumerator) {
    return obj
  }
  if (obj is Func || obj is Closure) {
    return obj
  }

  if (Type(obj) == 'Object') {
    return obj.ownProps()
  }
  return obj.__Enum(params*)
}
; #endregion helpers

#Requires AutoHotkey v2.1-
#Warn All, StdOut

import function_callback as f

/**
 * Gets an Enumerator that enumerates an elements or members of the specified object.
 * @param {object} obj
 * @return {Enumerator}
 */
/**
 * Calls the specified callback, passing each element or member of the object as a parameter.
 * @template T
 * @param {T} obj
 * @param {(value: unknown, key: unknown, obj: T) => void} callback
 */
export each(obj, callback?) {
  if (!IsObject(obj)) {
    throw TypeError('parametr #1 Need to specify an Object')
  }

  if (!IsSet(callback)) {
    if (obj is Enumerable) {
      return obj
    }
    return Enumerable(obj)
  }

  for key, value in Enumerable(obj) {
    f.callback(callback)(value, key, obj)
  }
}

/**
 * This class is a wrapper with utility methods for enumeration.
 * @template T
 * @param {T} source
 */
export class Enumerable {
  __NEW(source) {
    if (source is Enumerable) {
      return source
    }

    /**
     * @readonly
     * @property {object} __source
     */
    this.defineProp('__source', { get: (*) => source })
  }
  __ENUM(params*) {
    return getEnumerator(this.__source, params*)
  }
  /**
   * Returns an Enumerator that converts each enumerated element.
   * @template Result
   * @param {(value: unknown, key: unknown, source: T) => Result} callback
   * @return {Result}
   */
  map(callback) {
    props := this.__ENUM()
    _callback := f.callback(callback)
    return Enumerable((&key?, &value?) {
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
   *: ;; The following are all synonymous with `Map('key1', 'value1', 'key2', 'value2')`
   *: Map(each({ key1: 'value1', key2: 'value2' }).flatEntries()*)
   *: Map(each([ 'key1', 'value1', 'key2', 'value2' ]).flatEntries()*)
   *: Map(each(Map('key1', 'value1', 'key2', 'value2')).flatEntries()*)
   */
  flatEntries() {
    props := this.__ENUM()
    if (this.__source is Array) {
      return props
    }

    _key := unset
    _value := unset
    e := (&key?, &value?, *) {
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
        return e(&key, &value)
      }
      return false
    }

    return Enumerable(e)
  }
}

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

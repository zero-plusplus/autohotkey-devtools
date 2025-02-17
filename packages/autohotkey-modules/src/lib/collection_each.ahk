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
 */
export class Enumerable {
  __NEW(source) {
    /**
     * @readonly
     * @property {object} __source
     */
    this.defineProp('__source', { get: (*) => source })
  }
  __ENUM(params*) {
    __source := this.__source

    if (__source is Enumerator) {
      return __source
    }
    if (Type(__source) == 'Object') {
      return __source.ownProps()
    }
    return __source.__Enum()
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
    return e
  }
}

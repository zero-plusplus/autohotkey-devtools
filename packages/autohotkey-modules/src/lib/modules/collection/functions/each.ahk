#Requires AutoHotkey v2.1-

import './lib/modules/collection/classes/Enumerable' { Enumerable }
import './lib/modules/function/functions/invokeCallback' { invokeCallback }

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
    invokeCallback(callback, [ value, key, obj ])
  }
}

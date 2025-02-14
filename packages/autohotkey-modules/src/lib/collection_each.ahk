#Requires AutoHotkey v2.1-
#Warn All, StdOut

import function_callback as f

/**
 * Gets an Enumerator that enumerates an elements or members (including inherited) of the specified object.
 * @param {object} obj
 * @return {Enumerator}
 */
/**
 * Calls the specified callback, passing each element or member (including inherited) of the object as a parameter.
 * @template T
 * @param {T} obj
 * @param {(value: unknown, key: unknown, obj: T) => void} callback
 */
export each(obj, callback?) {
  if (!IsObject(obj)) {
    throw TypeError('parametr #1 Need to specify an Object')
  }

  props := Type(obj) == 'Object'
    ? obj.props()
    : obj.__Enum()
  if (!IsSet(callback)) {
    return props
  }

  for key, value in props {
    f.callback(callback)(value, key, obj)
  }
}

/**
 * Gets an Enumerator that enumerates elements or members of the specified object.
 * @param {object} obj
 * @return {Enumerator}
 */
/**
 * Calls the specified callback, passing each element or member of the object as a parameter.
 * @template T
 * @param {T} obj
 * @param {(value: unknown, key: unknown, obj: T) => void} callback
 */
export eachOwn(obj, callback?) {
  if (!IsObject(obj)) {
    throw TypeError('parametr #1 Need to specify an Object')
  }

  props := Type(obj) == 'Object'
    ? obj.ownProps()
    : obj.__Enum()
  if (!IsSet(callback)) {
    return props
  }

  for key, value in props {
    f.callback(callback)(value, key, obj)
  }
}

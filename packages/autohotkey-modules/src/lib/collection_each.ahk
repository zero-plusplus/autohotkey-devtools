#Requires AutoHotkey v2.1-
#Warn All, StdOut

import function_callback as f

/**
 * Gets an Enumerator that enumerates the elements that the specified object has.
 * @param {object} obj
 * @return {Enumerator}
 */
/**
 * Calls the specified callback passing each element the object has as an parameters.
 * @param {object} obj
 * @param {object} callback
 */
export each(obj, callback?) {
  if (!IsObject(obj)) {
    throw TypeError('parametr #1 Need to specify an Object')
  }

  props := Type(obj) == 'Object'
    ? obj.ownProps()
    : obj
  if (!IsSet(callback)) {
    return props
  }

  for key, value in props {
    f.callback(callback)(value, key, props)
  }
}

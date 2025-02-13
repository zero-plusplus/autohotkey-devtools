#Requires AutoHotkey v2.1-
#Warn All, StdOut

/**
 * Gets an child element from the specified object without raising an exception.
 * @template T
 * @param {object} obj
 * @param {string | unknown[]} keys
 * @return {any}
 */
export at(obj, keyOrKeys, default?) {
  if (!IsObject(obj)) {
    throw Error('parameter #1 of ' A_ThisFunc ' requires Object, but received the ' Type(obj))
  }
  keys := keyOrKeys is Array ? keyOrKeys : [ keyOrKeys ]

  current := obj
  for (i, key in keys) {
    if (Type(current) == 'Object') {
      if (current.hasProp(key)) {
        current := current.%key%
        continue
      }
    }
    else if (current.has(key)) {
      current := current[key]
      continue
    }
    return (default?)
  }

  return current
}

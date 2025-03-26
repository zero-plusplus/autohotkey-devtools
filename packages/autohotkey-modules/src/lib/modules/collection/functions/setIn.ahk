#Requires AutoHotkey v2.1-

/**
 * Sets a member to the specified object without raising an exception.
 * @template T
 * @param {object} obj
 * @param {string | unknown[]} keys
 * @param {string | unknown[]} value
 * @return {boolean} Returns `true` if the value is set successfully, `false` otherwise.
 */
export setIn(obj, keyOrKeys, value) {
  if (!IsObject(obj)) {
    throw Error('parameter #1 of ' A_ThisFunc ' requires Object, but received the ' Type(obj))
  }
  keys := keyOrKeys is Array ? keyOrKeys : [ keyOrKeys ]
  targetKey := keys.pop()

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

  try {
    if (Type(current) == 'Object') {
      current.%targetKey% := value
    }
    else {
      current[targetKey] := value
    }
  }
  catch {
    return false
  }
  return true
}

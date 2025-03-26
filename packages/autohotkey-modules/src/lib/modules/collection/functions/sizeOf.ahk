#Requires AutoHotkey v2.1-

/**
 * Gets number of members/elements of an object.
 * @param {object} obj
 * @return {number}
 */
export sizeOf(obj) {
  return obj.length ?? obj.count ?? ObjOwnPropCount(obj)
}

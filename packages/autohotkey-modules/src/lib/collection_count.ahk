#Requires AutoHotkey v2.1-
#Warn All, StdOut

import { at } from collection_at

/**
 * Gets number of members/elements of an object.
 * @param {object} obj
 * @return {number}
 */
export count(obj) {
  return obj.length ?? obj.count ?? ObjOwnPropCount(obj)
}

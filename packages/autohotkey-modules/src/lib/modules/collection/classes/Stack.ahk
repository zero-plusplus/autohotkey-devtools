#Requires AutoHotkey v2.1-
#Warn All, StdOut

/**
 * This class is a data structure that manages stack items based on the FILO (First In Last Out) concept.
 * @template [T extends unknown]
 */
export class Stack {
  /**
   * @param {T[]} items - Initial stack items
   */
  __NEW(items*) {
    /**
     * @readonly
     * @property {T[]} __items
     */
    this.defineProp('__items', { get: (*) => items })
  }
  __ENUM(params*) {
    __items := this.__items

    i := __items.length
    return (&key, &value) {
      if (!__items.has(i)) {
        return false
      }

      key := i--
      value := __items[key]

      return true
    }
  }
  /**
   * Number of stack items
   * @property {number}
   */
  count => this.__items.length
  /**
   * Checks if the stack is empty.
   * @return {boolean}
   */
  isEmpty() {
    return this.count == 0
  }
  /**
   * Gets a next stack item.
   * @return {T | unset}
   */
  peek() {
    __items := this.__items
    return (__items[__items.length]?)
  }
  /**
   * Gets a next stack item. The retrieved stack item is removed.
   * @return {T | unset}
   */
  pop() {
    __items := this.__items
    return __items.pop()
  }
  /**
   * Add a stack items.
   * @param {T[]} items*
   */
  push(items*) {
    __items := this.__items
    __items.push(items*)
  }
}

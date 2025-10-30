#Requires AutoHotkey v2.1-
#Warn All, StdOut

/**
 * This class is an array that stores only unique values.
 * @template T
 * @param {T[]} items*
 */
export class UniqueArray extends Array {
  __NEW(items*) {
    __map := Map()

    /**
     * @readonly
     * @property {Map<T, number>} __map
     */
    this.defineProp('__map', { get: (*) => __map })

    this.push(items*)
  }
  __ITEM[index] {
    get => super.__ITEM[index]
    set {
      if (this.hasValue(value)) {
        return
      }

      super.__ITEM[index] := value
    }
  }
  /**
   * Checks if the specified index has.
   * @override
   * @param {number}
   * @return {boolean}
   */
  has(item) {
    return super.has(item)
  }
  /**
   * Checks if the specified item has.
   * @param {T}
   * @return {boolean}
   */
  hasValue(item) {
    return this.__map.has(item)
  }
  /**
   * @override
   * @return {UniqueArray}
   */
  clone() {
    return UniqueArray(this*)
  }
  /**
   * Adds unique items that can be added to the specified index and returns the number of items added.
   * @override
   * @return {number}
   */
  insertAt(index, items*) {
    filteredItems := []
    for i, item in items {
      if (this.__map.has(item)) {
        continue
      }

      this.__map[item] := (index + 1) + filteredItems.length
      filteredItems.push(item)
    }

    super.insertAt(index, filteredItems*)
    return filteredItems.length
  }
  /**
   * @override
   */
  removeAt(index, length?) {
    for key, i in this.__map {
      if (!IsSet(length)) {
        if ( index == i) {
          this.__map.delete(key)
          break
        }
        continue
      }

      if (index <= i && i <= index + length) {
        this.__map.delete(key)
        continue
      }
    }
    return super.removeAt(index, (length?))
  }
  /**
   * @override
   */
  delete(index) {
    return this.removeAt(index, 1)
  }
  /**
   * Adds unique items that can be added to the end and returns the number of items added.
   * @override
   * @return {number}
   */
  push(items*) {
    return this.insertAt(this.length + 1, items*)
  }
  /**
   * Removes the last item and returns its value.
   * @return {unknown}
   */
  pop() {
    return this.removeAt(this.length)
  }
}

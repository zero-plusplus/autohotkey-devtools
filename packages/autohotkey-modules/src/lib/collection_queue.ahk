#Requires AutoHotkey v2.1-
#Warn All, StdOut

/**
 * This class is a data structure that manages queue items based on the FIFO (First In, First Out) concept.
 * @template [T extends unknown]
 */
export class Queue {
  /**
   * @param {T[]} items - Initial queue items
   */
  __NEW(items*) {
    this.defineProp('__items', { get: (*) => items })
  }
  __ENUM(params*) {
    __items := this.__items
    return __items.__ENUM(params*)
  }
  /**
   * Number of queue items
   * @property {number}
   */
  count => this.__items.length
  /**
   * Checks if the queue is empty.
   * @return {boolean}
   */
  isEmpty() {
    return this.count == 0
  }
  /**
   * Gets a next queue item.
   * @return {T | unset}
   */
  peek() {
    __items := this.__items
    return (__items[1]?)
  }
  /**
   * Gets a next queue item. The retrieved queue item is removed.
   * @return {T | unset}
   */
  dequeue() {
    __items := this.__items
    return __items.removeAt(1)
  }
  /**
   * Add an queue items.
   * @param {T[]} items*
   */
  enqueue(items*) {
    __items := this.__items
    __items.push(items*)
  }
}

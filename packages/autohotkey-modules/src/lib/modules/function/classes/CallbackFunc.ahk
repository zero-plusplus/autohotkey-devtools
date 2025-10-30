#Requires AutoHotkey v2.1-
#Warn All, StdOut

import './lib/modules/function/functions/invokeCallback' { invokeCallback }

/**
 * Wraps the specified `callable` so that it can be called without throwing an exception regardless of the number of parameters.
 * @template [Params extends unknown[], R, T extends (params*: Params) => R]
 * @param {T} callable
 * @param {Params} params*
 */
export class CallbackFunc {
  __NEW(callable, context?) {
    /**
     * @readonly
     * @property {T} __callable
     */
    this.defineProp('__callable', { get: (*) => callable })
    /**
     * @readonly
     * @property {object?} __context
     */
    this.defineProp('__context', { get: (*) => (context?) })
    /**
     * @readonly
     * @property {Params} __params
     */
    this.defineProp('__params', { get: (*) => [] })
    /**
     * @readonly
     * @property {string} name
     */
    this.defineProp('name', { get: (*) => callable.name })
    /**
     * @readonly
     * @property {boolean} isBuiltIn
     */
    this.defineProp('isBuiltIn', { get: (*) => callable.isBuiltIn })
    /**
     * @readonly
     * @property {boolean} isVariadic
     */
    this.defineProp('isVariadic', { get: (*) => callable.isVariadic })
    /**
     * @readonly
     * @property {number} minParams
     */
    this.defineProp('minParams', { get: (*) => callable.minParams })
    /**
     * @readonly
     * @property {number} maxParams
     */
    this.defineProp('maxParams', { get: (*) => callable.maxParams })
  }
  /**
   * @param {Params} params*
   * @return {R}
   */
  call(params*) {
    __callable := this.__callable
    __context := (this.__context?)

    params.insertAt(1, this.__params*)
    return invokeCallback(__callable, params, (__context?))
  }
  /**
   * @param {number} index
   * @return {boolean}
   */
  isByRef(index) {
    callable := this.__callable
    return callable.isByRef(index)
  }
  /**
   * @param {number} index
   * @return {boolean}
   */
  isOptional(index) {
    callable := this.__callable
    return callable.isOptional(index)
  }
  /**
   * @param {unknown[]} params*
   * @chainable
   */
  bind(params*) {
    this.defineProp('__params', { get: (*) => params })
    return this
  }
}

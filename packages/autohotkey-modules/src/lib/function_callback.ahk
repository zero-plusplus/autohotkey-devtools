#Requires AutoHotkey v2.1-

/**
 * Wraps the specified function so that it can be called without throwing an exception regardless of the number of parameters.
 * @template [T extends (params*: unknown[]) => unknown]
 * @param {T} callable
 * @return {T}
 */
export callback(callable) {
  return (params*) {
    if (callable.minParams <= params.length && params.length <= callable.maxParams) {
      return callable(params*)
    }

    slicedParams := []
    Loop callable.minParams {
      if (params.has(A_Index)) {
        slicedParams.push(params[A_Index])
        continue
      }
      slicedParams.push('')
    }
    return callable(slicedParams*)
  }
}

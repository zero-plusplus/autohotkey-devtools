#Requires AutoHotkey v2.1-
#Warn All, StdOut

/**
 * Calls the specified `callable` without throwing an exception regardless of the number of parameters.
 * @template [Params extends unknown[], R, T extends (params*: Params) => R]
 * @param {T} callable
 * @param {Param[]} params*
 * @return {R}
 */
export invokeCallback(callable, params := [], context?) {
  if (IsSet(context)) {
    params.insertAt(1, context)
  }

  slicedParams := []
  Loop callable.maxParams {
    if (params.has(A_Index)) {
      slicedParams.push(params[A_Index])
      continue
    }
    slicedParams.push('')
  }
  return callable.call(slicedParams*)
}

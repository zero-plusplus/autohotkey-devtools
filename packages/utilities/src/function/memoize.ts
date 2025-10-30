/**
 * Memoizes the specified function.
 * @param target
 * @param keyGenerator
 * @returns
 */
export function memoize<
  Args extends any[],
  Result,
  F extends (...args: Args) => Result,
>(target: F, keyGenerator: (...args: Args) => string = (...args) => JSON.stringify(args)): F {
  const cacheMap = new Map<string, Result>();

  return ((...args: Args): Result => {
    const key = keyGenerator(...args);
    if (cacheMap.has(key)) {
      return cacheMap.get(key)!;
    }

    const reulst = target(...args);
    cacheMap.set(key, reulst);
    return reulst;
  }) as F;
}

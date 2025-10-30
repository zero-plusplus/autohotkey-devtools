import { memoize } from './memoize';

/**
 * Applies a singleton pattern to the specified function.
 * Unlike `memoize`, the applied function does not accept arguments and is certified to always return the same instance.
 * @param target
 * @returns
 */
export function singleton<
  Result,
  F extends () => Result,
>(target: F): F {
  return memoize(target, () => '');
}

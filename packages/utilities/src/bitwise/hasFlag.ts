/**
 * Checks if the target has flags included.
 * @param target
 * @param flag
 * @returns
 */
export function hasFlag(target: number, flag: number): boolean {
  return 0 < (target & flag);
}

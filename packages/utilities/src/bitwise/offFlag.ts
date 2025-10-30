/**
 * Turns off specified flags on the target and returns them.
 * @param target
 * @param flag
 * @returns
 */
export function offFlag(target: number, flag: number): number {
  return target & ~flag;
}
